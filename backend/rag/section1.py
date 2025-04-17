from openai import OpenAI
from dotenv import load_dotenv
import os
from vectordb import *
from langchain_community.llms import OpenAI
from langchain_openai import OpenAI
from pydantic import BaseModel, Field, ValidationError
from typing import Literal, Dict
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
import random
import pytest
from torch import Tensor
# Load environment variables from .env file
load_dotenv()

# Update the instantiation
llm = OpenAI(temperature=0.7, model_name="gpt-3.5-turbo-instruct")


def generate_question_and_answer(content):
    """
    Generates a multiple-choice question and the correct answer based on the provided content using LangChain.
    :param content: Text content to base the question and answer on.
    :return: Generated question, options, correct answer, and explanation.
    """
    # Define response schema using Pydantic BaseModel
    class QuestionAnswerFormat(BaseModel):
        question: str = Field(..., description="The multiple-choice question")
        option_a: str = Field(..., description="Option A")
        option_b: str = Field(..., description="Option B")
        option_c: str = Field(..., description="Option C")
        option_d: str = Field(..., description="Option D")
        correct_answer: Literal["A", "B", "C", "D"] = Field(..., description="The correct option")

    parser = JsonOutputParser(pydantic_object=QuestionAnswerFormat)

    prompt = ChatPromptTemplate.from_template("""
        Based on the following content, generate a multiple-choice question with four options labeled A-D.
        Provide the question, options, and indicate which one is correct.
        Format your response as JSON like this:
        {format_instructions}

        Content:
        {content}
    """).partial(format_instructions=parser.get_format_instructions())

    # Chain LLM with parser and prompt
    chain = prompt | llm | parser

    try:
        result = chain.invoke({"content": content})
    except ValidationError as e:
        print("Validation error:", e)
        return None

    return result

def generate_feedback(content):
    pass

if __name__ == "__main__":

    #results = querySectionOne(query, chunks, index)
    #print(results)
    content="""Students should be able to explain the role of the different types of software in computer operation.
    Content: System Software: Operating System, Utilities. Application software: general-purpose and special-purpose; integrated package; source: off the shelf, custom-written, and customized."""
    result= generate_question_and_answer(content)
    print(result)