from dotenv import load_dotenv
import json
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field, ValidationError
from typing import Literal
from vectordb import *
from chunks import *

load_dotenv()

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

        For each content section, generate **1 multiple-choice question** with four options (A-D), and specify the correct answer. Make sure the correct answer does not always appear in the same letter position.

        Respond with a list of JSON objects (one per content) inside a code block using ```json delimiters.

        Each object must match the format:

        ```json
        {{
            "question": "The question text",
            "option_a": "Option A text",
            "option_b": "Option B text",
            "option_c": "Option C text",
            "option_d": "Option D text",
            "correct_answer": "A"
        }}
        {formatted_contents} """ )

    chain = prompt | llm | parser

    try:
        return chain.invoke({"formatted_contents": formatted_contents})
    except (ValidationError, json.JSONDecodeError) as e:
        print(f"First parsing attempt failed: {e}")
        try:
            # Raw LLM output in case of parse failure
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
    
    formatted_question = "\n".join([f"Question {i+1}:\n{c}" for i, c in enumerate(question)])
    
    prompt = ChatPromptTemplate.from_template(
        """ 
        You will be given a structured input with a question that a student got wrong and they needs to improve in.
        For the response generate in no more than 3 sentences, what weakness they demonstrate in relation to the feedback.

        Respond with a list of JSON objects (one per question) inside a code block using ```json delimiters.

        Generate output with EXACTLY these field names, see the json format below:
            - "Section" (integer)
            - "Feedback" (string)
        json
        {{
            "Section": 1 (this is a constant)
            "Feedback: "The feedback on what to improve on",
        }}
        
    Question:
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


def getSyllabus(lst:list[str], section_number):
    if len(lst)==0:
        match section_number:
            case 1:
                content=sectionOneSyllabus()
            case 2:
                content=sectionTwoSyllabus()
            case 3:
                content=sectionThreeSyllabus()
            case 4:
                content=sectionFourSyllabus()
            case 5:
                content=sectionFiveSyllabus()
            case 6:
                content=sectionSixSyllabus()
            case 7:
                content=sectionSevenSyllabus()
            case 8:
                content=sectionEightSyllabus()
            case _:
                return "Section numbers are between 1-8"
    else:
        content=[]
        match section_number:
            case 1:
                for c in lst:
                    embedding_path='section1_syllabus_embed'
                    chunk=get_matching_chunks(c,embedding_path,k=1)
                    content.append(chunk[0])
            case 2:
                for c in lst:
                    embedding_path='section2_syllabus_embed'
                    chunk=get_matching_chunks(c,embedding_path,k=1)
                    content.append(chunk[0])
            case 3:
                for c in lst:
                    embedding_path='section3_syllabus_embed'
                    chunk=get_matching_chunks(c,embedding_path,k=1)
                    content.append(chunk[0])
            case 4:
                for c in lst:
                    embedding_path='section4_syllabus_embed'
                    chunk=get_matching_chunks(c,embedding_path,k=1)
                    content.append(chunk[0])
            case 5:
                for c in lst:
                    embedding_path='section5_syllabus_embed'
                    chunk=get_matching_chunks(c,embedding_path,k=1)
                    content.append(chunk[0])
            case 6:
                for c in lst:
                    embedding_path='section6_syllabus_embed'
                    chunk=get_matching_chunks(c,embedding_path,k=1)
                    content.append(chunk[0])
            case 7:
                for c in lst:
                    embedding_path='section7_syllabus_embed'
                    chunk=get_matching_chunks(c,embedding_path,k=1)
                    content.append(chunk[0])
            case 8:
                for c in lst:
                    embedding_path='section8_syllabus_embed'
                    chunk=get_matching_chunks(c,embedding_path,k=1)
                    content.append(chunk[0])
            case _:
                return "Section numbers are between 1-8"
    return content


def quiz(feedback: list[str], section_number):
    """
    Creates the quiz for the specified section number using the feedback

    Args:
        feedback:  A list[str] of 0 or more feedbacks obtained from the previous quiz.
        section_number: The syllabus section number the feedback belongs to.

    Returns:
        list: A list of JSON questions and answers.
    """
    content=getSyllabus(feedback, section_number)
    
    return content

def feedback(question: list[str], section_number):
    """
    Creates the feedback from an attempted quiz given the section number

    Args:
        question:  A list[str] of 0 or more questions the student has gotten wrong
        section_number: The syllabus section number the feedback belongs to.

    Returns:
        list: A list of JSON feedback for each question.
    """
    if len(question)==0:
        return "You need questions to generate the feedback"
    
    content=getSyllabus(question, section_number)
    return content 

if __name__ == "__main__":
    result = feedback(["Which of the following distinguish between data and information? a. data is raw information is not. b.information is raw and data is not. c. both are raw d. both are processed"], 1)
    print(result)
   
    """
    if result:
        print(json.dumps(result, indent=4))
    else:
        print(json.dumps({"error": "Failed to generate valid question and answer"}))
    """