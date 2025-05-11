from dotenv import load_dotenv
import json
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field, ValidationError
from typing import Literal
from vectordb import *
from chunks import *
from ragas.metrics import faithfulness
from ragas import evaluate
from datasets import Dataset
load_dotenv()
import sys

SECTION_MAP = {
    "1": sectionOneSyllabus,
    "2": sectionTwoSyllabus,
    "3": sectionThreeSyllabus,
    "4": sectionFourSyllabus,
    "5": sectionFiveSyllabus,
    "6": sectionSixSyllabus,
    "7": sectionSevenSyllabus,
    "8": sectionEightSyllabus,
}

llm = ChatOpenAI(temperature=0.8, model="gpt-4")

class QuestionAnswerFormat(BaseModel):
    question: str = Field(..., description="The multiple-choice question")
    option_a: str = Field(..., description="Option A")
    option_b: str = Field(..., description="Option B")
    option_c: str = Field(..., description="Option C")
    option_d: str = Field(..., description="Option D")
    correct_answer: Literal["A", "B", "C", "D"] = Field(
        ..., description="The correct option"
    )


class Feedback(BaseModel):
    Section: int = Field(..., description="The section number that the feedback is from")
    Feedback: str = Field(..., description="The area that the student should improve on")


def clean_json_response(json_str: str) -> str:
    """Improved JSON cleaning with delimiter handling"""
    json_str = json_str.replace("```json", "").replace("```", "").strip()

    corrections = [
        ("'", '"'),
        ("True", "true"),
        ("False", "false"),
        ("“", '"'),
        ("”", '"'),
        ("\\", ""),
    ]
    for wrong, right in corrections:
        json_str = json_str.replace(wrong, right)

    return json_str


def generate_question_and_answer(contents: list[str]):
    """Generates one MCQ per content from a list of contents in a single LLM call"""
    parser = JsonOutputParser(pydantic_object=list[QuestionAnswerFormat])
    
    formatted_contents = "\n".join([f"Content {i+1}:\n{c}" for i, c in enumerate(contents)])
    
    prompt = ChatPromptTemplate.from_template(
        """
        You will be given multiple sections of content, each labeled as "Content 1", "Content 2", etc.

        For each content, generate **exactly one multiple-choice question** with four options (A-D), and specify the correct answer. Make sure the correct answer does not always appear in the same letter position.

        Respond with a list of JSON objects (one per content) inside a code block using ```json delimiters.
        Each object must contain exactly one question.

        Each object must match the format:
        ```json
        {{
            "question": "The question text",
            "option_a": "Option A text",
            "option_b": "Option B text",
            "option_c": "Option C text",
            "option_d": "Option D text",
            "explanation" : "The explanation for the correct answer",
            "correct_answer": "A"
        }}
        ```
        
        Contents:
        {formatted_contents}
        """ )

    chain = prompt | llm | parser

    try:
        result = chain.invoke({"formatted_contents": formatted_contents})
        
        return result
    except (ValidationError, json.JSONDecodeError) as e:
        print(f"First parsing attempt failed: {e}")
        try:
            
            raw_output = (prompt | llm).invoke({"formatted_contents": formatted_contents}).content
            print("Raw LLM output:", raw_output)

            cleaned_json = clean_json_response(raw_output)
            print("Cleaned JSON:", cleaned_json)

            return json.loads(cleaned_json)
        except Exception as e:
            print(f"Final parsing failure: {e}")
            return None


def generate_feedback(question: list[str]):
    """Generates Feedback from a syllabus objective with robust JSON handling using delimiters"""
    parser = JsonOutputParser(pydantic_object=list[Feedback])
    
    formatted_question = "\n".join([f"Objective {i+1}:\n{c}" for i, c in enumerate(question)])
    
    prompt = ChatPromptTemplate.from_template(
        """ 
        You will be given a structured input with description and the content of the syllabus objective the student got wrong and needs improvement.
        For the response generate in no more than 3 sentences, what weakness they demonstrate in relation to the feedback.

        Respond with a list of JSON objects (one per question) inside a code block using ```json delimiters.

        Generate output with EXACTLY these field names, see the json format below:
            - "Section" (integer)
            - "Feedback" (string)
        json
        {{
            "Section": 1 (this is a constant),
            "Feedback: "The feedback on what to improve on"
        }}
        
    Syllabus:
        {formatted_question}
        """
    )

    chain = prompt | llm | parser

    try:
        return chain.invoke({"formatted_question": formatted_question})
    except (ValidationError, json.JSONDecodeError) as e:
        print(f"First parsing attempt failed: {e}")
        try:
            # Clean up output if necessary
            raw_output = (prompt | llm).invoke({"formatted_question": formatted_question}).content
            print("Raw LLM output:", raw_output)

            cleaned_json = clean_json_response(raw_output)
            print("Cleaned JSON:", cleaned_json)

            return parser.parse(cleaned_json)
        except Exception as e:
            print(f"Final parsing failure: {e}")
            return None


def getSyllabus(lst: list[dict], section_number):
    if not 1 <= section_number <= 8:
        return "Section numbers are between 1-8"

    if len(lst) == 0:
        syllabus_functions = {
            1: sectionOneSyllabus,
            2: sectionTwoSyllabus,
            3: sectionThreeSyllabus,
            4: sectionFourSyllabus,
            5: sectionFiveSyllabus,
            6: sectionSixSyllabus,
            7: sectionSevenSyllabus,
            8: sectionEightSyllabus,
        }
        content = syllabus_functions[section_number]()
        return content  

    content = []
    embedding_path = f'section{section_number}_syllabus_embed'
    for c in lst:
        query = c.get("feedbackText", "")
        if not query:
            continue
        chunk = get_matching_chunks(query, embedding_path, k=1)
        if chunk:
            content.append(chunk[0])

    return content

def is_question_logically_consistent(question: str, syllabus_content: str) -> bool:
    """
    Uses LLM to verify if the question logically aligns with the syllabus content.
    Returns True if consistent, False otherwise.
    """
    prompt = ChatPromptTemplate.from_template("""
    Determine if the following question is logically consistent with the given syllabus content.
    Respond ONLY with 'True' or 'False'.

    Syllabus Content: {syllabus_content}
    Question: {question}
    """)

    chain = prompt | llm
    response = chain.invoke({
        "question": question,
        "syllabus_content": syllabus_content
    }).content.strip()

    return response == "True"

def quiz(feedback: list[str], section_number):
    """
    Creates the quiz for the specified section number using the feedback
    Now includes logical consistency checking for generated questions.
    """
    content = getSyllabus(feedback, section_number)
    quiz = generate_question_and_answer(content)
    embedding_path = f"section{section_number}_syllabus_embed"
    quiz_list = [quiz] if not isinstance(quiz, list) else quiz
    validated_quiz = []

    for i, qz in enumerate(quiz_list):
        max_attempts = 2
        attempt = 0
        similarity_score = 0
        question_text = qz['question']
        syllabus_chunk = content[i] if i < len(content) else content[-1]
        
        while attempt < max_attempts:
            # Check both similarity and logical consistency
            similarity_score = get_similarity_scores(question_text, embedding_path)[0]
            is_consistent = is_question_logically_consistent(question_text, syllabus_chunk)
            if similarity_score >= 0.60 and is_consistent:
                validated_quiz.append(qz)
                break
            
            attempt += 1
            
            # Regenerate question if validation fails
            quiz_to_use = content[i]
            new_question = generate_question_and_answer([quiz_to_use])
            new_question = [new_question] if not isinstance(new_question, list) else new_question
            question_text = new_question[0]['question']
            
            if attempt == max_attempts:
                print("Quiz question not aligned with syllabus or logically inconsistent")
    
    return validated_quiz

def feedback(question: list[str], section_number):
    """
    Creates the feedback from an attempted quiz given the section number

    Args:
        question:  A list[str] of 0 or more questions the student has gotten wrong
        section_number: The syllabus section number the feedback belongs to.

    Returns:
        list: A list of JSON feedback for each question.
    """
    if not question:
        return "You need questions to generate the feedback"

    embedding_path = f"section{section_number}_syllabus_embed" if 1 <= section_number <= 8 else "Sections available are from 1-8"
    
    content=getSyllabus(question, section_number)
    if not content:
        return "All questions posted were not of the requisite similarity and hence no feedback can be created"
    
    feedback=generate_feedback(content)
    feedback_list = [feedback] if not isinstance(feedback, list) else feedback
    
    validated_feedback = []

    #Answer Relevance
    for i, fb in enumerate(feedback_list):
        max_attempts = 2
        attempt = 0
        similarity_score = 0
        feedback=fb['Feedback']

        while attempt < max_attempts:
            print(json.dumps(feedback, indent=4))
            similarity_score = get_similarity_scores(feedback, embedding_path)[0]
            if similarity_score >= 0.60:
                validated_feedback.append(fb)
                break
                
            attempt += 1
            
            question_to_use=question[i]
            new_content=getSyllabus([question_to_use], section_number)
            feedback=generate_feedback(new_content)

            if attempt==max_attempts and similarity_score<0.60:
                        validated_feedback.append({
                            "Feedback": "Feedback may not be fully aligned with syllabus"
                        })
        
    return validated_feedback

if __name__ == "__main__":
    import traceback
    import json
    import sys

    def log_error_to_file(error_message):
        """Logs the error message to error_log.txt."""
        try:
            with open("error_log.txt", "a") as error_file:
                error_file.write(json.dumps(error_message, indent=4))
                error_file.write("\n")
        except Exception as e:
            print(f"Failed to write to error_log.txt: {e}")

    section_arg = sys.argv[1] if len(sys.argv) > 1 else "1"
    action_flag = sys.argv[2] if len(sys.argv) > 2 else ""

    try:
        raw_input = sys.stdin.read()
        input_data = json.loads(raw_input)
        feedback_data = input_data.get("feedback", [])
    except Exception as e:
        log_error_to_file({
            "error": f"Failed to read or parse stdin: {str(e)}",
            "trace": traceback.format_exc()
        })
        sys.exit(1)

    try:
        if action_flag == "feedback" and feedback_data:
            feedback_texts = [fb.get('Feedback', fb.get('feedbackText', '')) for fb in feedback_data]
            raw_output = generate_feedback(feedback_texts)
            cleaned = clean_json_response(str(raw_output))
            result = json.loads(str(cleaned))
        else:
            section_func = SECTION_MAP.get(section_arg)
            if not section_func:
                log_error_to_file({"error": f"Invalid section: {section_arg}"})
                sys.exit(1)
            result = quiz(feedback_data, int(section_arg))
    except Exception as e:
        log_error_to_file({
            "error": f"Unhandled exception during processing: {str(e)}",
            "trace": traceback.format_exc()
        })
        sys.exit(1)

    if result:
        print(json.dumps(result, indent=4))
    else:
        error_message = {"error": "Failed to generate valid result"}
        log_error_to_file(error_message)
        sys.exit(1)
