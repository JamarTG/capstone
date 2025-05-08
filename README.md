# Retrieval-Augmented Generation (RAG)-Based Quiz Application  

![image](https://github.com/user-attachments/assets/aaf0df32-bee2-41a5-b737-1a66e6e633a8)

## Abstract  
This system is an intelligent, interactive quiz platform designed to support personalized learning using Retrieval-Augmented Generation (RAG). It applies advanced natural language processing and adaptive assessment techniques to evaluate student performance and provide feedback only on unmet learning objectives. The application was developed with a focus on the CSEC Information Technology syllabus.  

## System Architecture    
- Frontend: React, TypeScript, TailwindCSS  
- Backend: Node.js, Express  
- Database: MongoDB  
- AI Engine: GPT-4
- Vector Store: FAISS  
- Embeddings: BAAI/bge-base-en-v1.5

## Learning Approach  

### Diagnostic-Driven Instruction  
Each quiz is aligned with specific syllabus objectives. Student responses are analyzed at the objective level to diagnose conceptual understanding, rather than simply marking answers as right or wrong.  

### Targeted Feedback on Unmet Objectives  
The system provides precise feedback by identifying only the objectives the student has not yet mastered. Remediation is contextual and focused, reducing cognitive load and helping students focus on relevant learning gaps.  

### Retrieval-Augmented Generation (RAG)  
RAG powers the generation of both quiz items and feedback. The system retrieves relevant syllabus content using vector-based search before passing it to a language model for generating curriculum-aligned questions and explanations.  

### Adaptive Reinforcement  
Follow-up quizzes are dynamically generated with new questions that specifically target the student’s unmet objectives or areas of weakness, promoting mastery through focused practice.  


![image](https://github.com/user-attachments/assets/16add320-e0af-4778-86e1-d2d4356ad62f)


### RAG-Based Question Generation Pipeline

1. **User Context Input:** The user specifies the topics or subject areas for which they require practice questions, forming the basis for the content retrieval.  
2. **Feedback Integration:** The system evaluates the user's previous interactions, extracting data from past incorrect responses to refine the question generation process.  
3. **Semantic Content Retrieval:** In the absence of relevant feedback, the system executes a vector-based search to retrieve semantically similar content from the curriculum database.  
4. **Prompt Synthesis:** The retrieved content is integrated with predefined question templates to generate context-rich prompts suitable for question formation.  
5. **LLM-Driven Question Generation:** A language model (LLM) processes the combined context and templates, generating high-quality, curriculum-aligned assessment items.  
6. **Frontend Rendering:** The generated questions are delivered through a React frontend, where the user can interact with and attempt the questions.



## Question Generation Implementation

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

prompt = ChatPromptTemplate.from_template("""
Generate a multiple-choice question about: {topic}
Context: {retrieved_content}
Format: JSON with question, 4 options, and correct answer
""")

llm = ChatOpenAI(model="gpt-3.5-turbo")
chain = prompt | llm
```

## Installation

```bash
# Clone the repository
git clone https://github.com/JamarTG/csec-it-adaptive-learning-system.git
# Install backend dependencies
cd backend
npm install
npm run dev

# Install frontend dependencies
cd ../frontend
npm install
npm run dev

# Set up environment configuration
cp .env.example .env

```

## Configuration

Required environment variables (`.env` file):

```bash
# Database configuration
MONGODB_URI=

# AI service API keys
OPENAI_API_KEY=

#For choose PORT for API
PORT=

#For Authentication
JWT_SECRET=

#For login duration
LOGIN_DURATION=
```

## License  
This project is licensed under the MIT License - see the LICENSE.md file for details.
