
export interface Topic {
  name: string;
  description: string;
  backgroundImage: string;
  objectives: string[]; 
}

const topics: Topic[] = [
  {
    name: "Computer Fundamentals and Information Processing",
    description: "Foundational understanding of computer hardware, software, and information processing.",
    backgroundImage: "/topics/fundamentals.webp",
    objectives: [
      "Understand the basics of computer hardware and software.",
      "Learn how data is processed by computers.",
      "Explore fundamental concepts of information technology."
    ],
  },
  {
    name: "Computer Networks and Web Technologies",
    description: "Basics of networking, mobile networks, Internet, and Web technologies.",
    backgroundImage: "/topics/network.webp",
    objectives: [
      "Understand networking basics and protocols.",
      "Learn about mobile networks and the Internet.",
      "Explore web technologies and their impact on communication."
    ],
  },
  {
    name: "Social and Economic Impact of ICT",
    description: "Knowledge of computer security, cybersecurity measures, and technology's societal impact.",
    backgroundImage: "/topics/social.webp",
    objectives: [
      "Examine the role of ICT in society.",
      "Understand cybersecurity challenges and measures.",
      "Analyze the economic impact of ICT on global industries."
    ],
  },
  {
    name: "Word-Processing and Web Page Design",
    description: "Practical skills in word-processing and web design for professional documents and web pages.",
    backgroundImage: "/topics/web.webp",
    objectives: [
      "Master word-processing software for creating professional documents.",
      "Learn the fundamentals of web page design and HTML.",
      "Design user-friendly and responsive web pages."
    ],
  },
  {
    name: "Database Management",
    description: "Proficiency in spreadsheet software for data organization, analysis, and business applications.",
    backgroundImage: "/topics/database.webp",
    objectives: [
      "Learn how to organize and analyze data using databases.",
      "Understand relational database management systems (RDBMS).",
      "Apply database concepts to business scenarios."
    ],
  },
  {
    name: "Problem-Solving and Program Design",
    description: "Skills in designing and implementing database management systems (DBMS).",
    backgroundImage: "/topics/problem-solving.png",
    objectives: [
      "Understand problem-solving techniques in programming.",
      "Design algorithms and data structures for programming solutions.",
      "Learn how to implement and optimize database management systems."
    ],
  },
  {
    name: "Program Implementation",
    description: "Analytical and problem-solving skills using computational thinking and programming concepts.",
    backgroundImage: "/topics/code.webp",
    objectives: [
      "Develop programming skills in various languages.",
      "Understand computational thinking and its applications.",
      "Implement algorithms and solve problems programmatically."
    ],
  },
];

export { topics };
