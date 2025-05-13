import Card from "../../components/ui/Card";
import { useTheme } from "../../hooks/useTheme";
import { Section } from "./types";

interface QuizSectionProps {
  section: Section;
  onClick: () => void;
  isLoading: boolean;
}

const QuizSection = ({ section, onClick, isLoading }: QuizSectionProps) => {
  const { isDark } = useTheme();

  return (
    <Card
      animateOnHover={false}
      className={`border ${isDark ? "border-gray-700" : "border-gray-200"} rounded-lg relative flex flex-col min-h-[10rem] bg-white overflow-hidden p-0 transition-all duration-300 group`}
      style={{
        backgroundImage: `url('${section.bgSrc}')`,
        backgroundSize: "cover",
        height: "180px",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-full space-y-2">
            <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className="text-white text-sm">Loading quiz for {section.name}...</p>
          </div>
        ) : (
          <>
            <h2 className="text-sm text-white">{section.name}</h2>
            <div className="w-full h-px bg-white/20 my-2"></div>
            <button
              onClick={onClick}
              className={`border-2 px-2 py-2 rounded-md text-sm font-medium border-gray-200 text-white transition-colors duration-200 hover:bg-gray-700`}
            >
              Get Assessed
            </button>
          </>
        )}
      </div>
    </Card>
  );
};

export default QuizSection;
