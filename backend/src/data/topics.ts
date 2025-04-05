import { ObjectId, Types } from "mongoose";

const topics = [
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1a1",
    name: "Computer Fundamentals and Information Processing",
    description: "Foundational understanding of computer hardware, software, and information processing.",
    backgroundImage: "/src/assets/images/quiz/fundamentals.webp",
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1a2",
    name: "Computer Networks and Web Technologies",
    description: "Basics of networking, mobile networks, Internet, and Web technologies.",
    backgroundImage: "/src/assets/images/quiz/network.webp",
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1a3",
    name: "Social and Economic Impact of ICT",
    description: "Knowledge of computer security, cybersecurity measures, and technology's societal impact.",
    backgroundImage: "/src/assets/images/quiz/social.webp",
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1a4",
    name: "Word-Processing and Web Page Design",
    description: "Practical skills in word-processing and web design for professional documents and web pages.",
    backgroundImage: "/src/assets/images/quiz/web.webp",
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1a5",
    name: "Database Management",
    description: "Proficiency in spreadsheet software for data organization, analysis, and business applications.",
    backgroundImage: "/src/assets/images/quiz/database.webp",
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1a6",
    name: "Problem-Solving and Program Design",
    description: "Skills in designing and implementing database management systems (DBMS).",
    backgroundImage: "/src/assets/images/quiz/problem-solving.webp",
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1a7",
    name: "Program Implementation",
    description: "Analytical and problem-solving skills using computational thinking and programming concepts.",
    backgroundImage: "/src/assets/images/quiz/code.webp",
  },
];

const objectives = [
  
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1b1",
    description: "Understand the basics of computer hardware and software.",
    topic: "65f0a0a1e6a2c1b0a4e3b1a1",
    questions: []
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1b2",
    description: "Learn how data is processed by computers.",
    topic: "65f0a0a1e6a2c1b0a4e3b1a1",
    questions: []
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1b3",
    description: "Explore fundamental concepts of information technology.",
    topic: "65f0a0a1e6a2c1b0a4e3b1a1",
    questions: []
  },
  

  {
    _id:"65f0a0a1e6a2c1b0a4e3b1b4",
    description: "Understand networking basics and protocols.",
    topic: "65f0a0a1e6a2c1b0a4e3b1a2",
    questions: []
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1b5",
    description: "Learn about mobile networks and the Internet.",
    topic: "65f0a0a1e6a2c1b0a4e3b1a2",
    questions: []
  },
  {
    _id: new Types.ObjectId("65f0a0a1e6a2c1b0a4e3b1b6"),
    description: "Explore web technologies and their impact on communication.",
    topic: "65f0a0a1e6a2c1b0a4e3b1a2",
    questions: [] as Types.ObjectId[]  
  
  }
];


const questions = [
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1c1",
    text: "Which of the following is NOT a hardware component?",
    options: {
      A: "CPU",
      B: "RAM",
      C: "Operating System",
      D: "Hard Drive"
    },
    correctAnswer: "C",
    explanation: "The operating system is software, not hardware.",
    objective: objectives[0]._id!,
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1c2",
    text: "What is the main function of an input device?",
    options: {
      A: "Process data",
      B: "Store information",
      C: "Enter data into the computer",
      D: "Display output"
    },
    correctAnswer: "C",
    explanation: "Input devices are used to enter data into the computer system.",
    objective: objectives[0]._id!,
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1c3",
    text: "Which software type controls hardware operations?",
    options: {
      A: "Application software",
      B: "System software",
      C: "Utility software",
      D: "Programming software"
    },
    correctAnswer: "B",
    explanation: "System software (like operating systems) controls hardware operations.",
    objective: objectives[0]._id!,
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1c4",
    text: "What does RAM stand for?",
    options: {
      A: "Random Access Memory",
      B: "Readily Available Memory",
      C: "Random Active Memory",
      D: "Read Access Memory"
    },
    correctAnswer: "A",
    explanation: "RAM stands for Random Access Memory, the computer's short-term memory.",
    objective: objectives[0]._id!,
  },
  {
    _id:"65f0a0a1e6a2c1b0a4e3b1c5",
    text: "Which component is considered the 'brain' of the computer?",
    options: {
      A: "GPU",
      B: "RAM",
      C: "CPU",
      D: "Motherboard"
    },
    correctAnswer: "C",
    explanation: "The CPU (Central Processing Unit) is often called the brain of the computer.",
    objective: objectives[0]._id!,
  },
];

export { topics, objectives, questions };