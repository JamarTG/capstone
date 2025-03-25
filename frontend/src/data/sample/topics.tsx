// import
import { FaMicrochip } from "react-icons/fa6";
import { FaNetworkWired } from "react-icons/fa6";
import { PiMicrosoftWordLogoFill } from "react-icons/pi";
import { FaDatabase } from "react-icons/fa";
import { GiPuzzle } from "react-icons/gi";
import { FaLaptopCode } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

export interface Topic {
  name: string;
  description: string;
  icon: IconType;
}

const topics: Topic[] = [
  {
    name: "Computer Fundamentals and Information Processing",
    description: "Foundational understanding of computer hardware, software, and information processing.",
    icon: FaMicrochip,
  },
  {
    name: "Computer Networks and Web Technologies",
    description: "Basics of networking, mobile networks, Internet, and Web technologies.",
    icon: FaNetworkWired,
  },
  {
    name: "Social and Economic Impact of Information and Communications Technology",
    description: "Knowledge of computer security, cybersecurity measures, and technology's societal impact.",
    icon: FaPeopleGroup,
  },
  {
    name: "Word-Processing and Web Page Design",
    description: "Practical skills in word-processing and web design for professional documents and web pages.",
    icon: PiMicrosoftWordLogoFill,
  },
  {
    name: "Database Management",
    description: "Proficiency in spreadsheet software for data organization, analysis, and business applications.",
    icon: FaDatabase,
  },
  {
    name: "Problem-Solving and Program Design",
    description: "Skills in designing and implementing database management systems (DBMS).",
    icon: GiPuzzle,
  },
  {
    name: "Program Implementation",
    description: "Analytical and problem-solving skills using computational thinking and programming concepts.",
    icon: FaLaptopCode,
  },
];

export { topics };
