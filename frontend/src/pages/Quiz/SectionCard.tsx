import Card from "../../components/ui/Card";
import { useTheme } from "../../context/ThemeContext";
import Button from "../../components/ui/Button";

const SectionCard = ({
  section,
  onClick,
}: {
  section: { name: string; bgSrc: string };
  onClick: () => void;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
        <h2 className="text-sm font-bold text-white">{section.name}</h2>
        <div className="w-full h-px bg-white/20 my-2"></div>
      
        <Button
          onClick={onClick}
          className={`py-2 rounded-md text-sm font-medium ${
            isDark
              ? "bg-gray-200 hover:bg-purple-700 text-white"
              : "bg-gray-200 hover:bg-blue-700 text-white"
          } transition-colors duration-200`}
        >
          Start Quiz
        </Button>
      </div>
    </Card>
  );
};

export default SectionCard;
