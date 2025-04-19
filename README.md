# Retrieval-Augmented Generation (RAG)-Based Quiz Application  

![image](https://github.com/user-attachments/assets/aaf0df32-bee2-41a5-b737-1a66e6e633a8)

## Abstract  
This system is an intelligent, interactive quiz platform designed to support personalized learning using Retrieval-Augmented Generation (RAG). It applies advanced natural language processing and adaptive assessment techniques to evaluate student performance and provide feedback only on unmet learning objectives. The application was developed with a focus on the CSEC Information Technology syllabus but can be generalized to other academic domains.  

## System Architecture  
### Components  
- Frontend: React, TypeScript, TailwindCSS  
- Backend: Node.js, Express  
- Database: MongoDB  
- AI Engine: GPT-4
- Vector Store: FAISS  
- Embeddings: BAAI/bge-base-en-v1.5

## Pedagogical Framework  
### Diagnostic-Driven Instruction  
Each quiz is diagnostically aligned with specific syllabus objectives. Responses are analyzed at the objective level, not just by individual question correctness.  

### Targeted Feedback on Unmet Objectives  
Rather than providing general correctness feedback, the system identifies only unmet objectives and delivers targeted, contextual remediation. This minimizes cognitive load and directs learner attention to relevant gaps.  

### Retrieval-Augmented Generation (RAG)  
RAG enables the system to generate quiz questions and feedback explanations using real syllabus content. By retrieving relevant context before invoking the language model, the system ensures both accuracy and alignment with curricular goals.  

### Adaptive Reinforcement  
Students retake follow-up quizzes dynamically populated with items linked only to previously unmet objectives. Mastery-based progression ensures efficient use of study time and measurable improvement.  

## Technical Implementation  

![image](https://github.com/user-attachments/assets/16add320-e0af-4778-86e1-d2d4356ad62f)


### RAG-Based Question Generation Pipeline  
1. User Context Input: Topics or subject areas selected for testing  
2. Vector Search: Retrieves relevant syllabus content using semantic similarity  
3. Prompt Construction: Combines retrieved context with question templates  
4. LLM Generation: Produces curriculum-aligned assessment items  


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
