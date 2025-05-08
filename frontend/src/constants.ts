import sectionOne from "./assets/images/quiz/1.webp";
import sectionTwo from "./assets/images/quiz/2.webp";
import sectionThree from "./assets/images/quiz/3.webp";
import sectionFour from "./assets/images/quiz/4.webp";
import sectionFive from "./assets/images/quiz/5.webp";
import sectionSix from "./assets/images/quiz/6.webp";
import sectionSeven from "./assets/images/quiz/7.webp";
import sectionEight from "./assets/images/quiz/8.webp";
import { LoginFormErrors, LoginFormFields, RegisterFormErrors, RegisterFormFields } from "./types/form";


export const FORM_CONSTANTS = {
  LOGIN: {
    initialLoginFields: { email: "", password: "" } as LoginFormFields,
    initialLoginErrors: { email: "", password: "" } as LoginFormErrors,  
  },
  REGISTER: {
    initialRegisterFields: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    } as RegisterFormFields,
    initialRegisterErrors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    } as RegisterFormErrors,  
  },
};
export const Section_Map: Record<number, { bgSrc: string; name: string }> = {
  1: { bgSrc: sectionOne, name: "Computer Fundamentals and Information Processing" },
  2: { bgSrc: sectionTwo, name: "Computer Networks and Web Technologies" },
  3: { bgSrc: sectionThree, name: "Social and Economic Impact of Information and Communication Technology (ICT)" },
  4: { bgSrc: sectionFour, name: "Word Processing and Web Page Design" },
  5: { bgSrc: sectionFive, name: "Spreadsheets" },
  6: { bgSrc: sectionSix, name: "Database Management" },
  7: { bgSrc: sectionSeven, name: "Problem Solving and Program Design" },
  8: { bgSrc: sectionEight, name: "Program Implementation" },
};

