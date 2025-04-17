from dotenv import load_dotenv
import json
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field, ValidationError
from typing import Literal

load_dotenv()

llm = ChatOpenAI(temperature=0.7, model="gpt-3.5-turbo")

class QuestionAnswerFormat(BaseModel):
    question: str = Field(..., description="The multiple-choice question")
    option_a: str = Field(..., description="Option A")
    option_b: str = Field(..., description="Option B")
    option_c: str = Field(..., description="Option C")
    option_d: str = Field(..., description="Option D")
    correct_answer: Literal["A", "B", "C", "D"] = Field(
        ..., description="The correct option"
    )


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


def generate_question_and_answer(content):
    """Generates MCQ with robust JSON handling using delimiters"""
    parser = JsonOutputParser(pydantic_object=QuestionAnswerFormat)

    prompt = ChatPromptTemplate.from_template(
        """ 
    You are an AI tutor. Based on the following content, generate ONE multiple-choice question with four options labeled A-D. 
    You MUST respond with valid JSON enclosed in a code block using ```json delimiters:

    ```json
    {{
        "question": "the question text",
        "option_a": "Option A text",
        "option_b": "Option B text",
        "option_c": "Option C text",
        "option_d": "Option D text",
        "correct_answer": "A"  // or B, C, D
    }}
    ```

    Content:
    {content}
    """
    )

    chain = prompt | llm | parser

    try:
        return chain.invoke({"content": content})
    except (ValidationError, json.JSONDecodeError) as e:
        print(f"First parsing attempt failed: {e}")
        try:
            # Clean up output if necessary
            raw_output = (prompt | llm).invoke({"content": content}).content
            print("Raw LLM output:", raw_output)

            cleaned_json = clean_json_response(raw_output)
            print("Cleaned JSON:", cleaned_json)

            return parser.parse(cleaned_json)
        except Exception as e:
            print(f"Final parsing failure: {e}")
            return None


if __name__ == "__main__":
    content = """System Software: Operating System, Utilities. Application software: general-purpose and special-purpose; integrated package; source: off the shelf, custom-written, and customized."""

    result = generate_question_and_answer(content)

    if result:
        print(json.dumps(result, indent=4))
    else:
        print(json.dumps({"error": "Failed to generate valid question and answer"}))
