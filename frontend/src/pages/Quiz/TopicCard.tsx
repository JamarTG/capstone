import Card from "../../components/ui/Card";
import { Topic } from "./QuizCard";
import { useTheme } from "../../context/ThemeContext";

const TopicCard = ({ topic, onClick }: { topic: Topic; onClick: () => void }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card
      onClick={onClick}
      animateOnHover={false}
      className={`w-70 h-20 border ${isDark ? "border-gray-700" : "border-gray-200"} rounded-lg relative flex flex-col min-h-[10rem] bg-white overflow-hidden p-0 transition-all duration-300 group`}
      style={{
        backgroundImage: `url('${topic.backgroundImage}')`,
        backgroundSize: "cover",
        height: "180px",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <h2 className="text-sm font-bold text-white">{topic.name}</h2>
        <div className="w-full h-px bg-white/20 my-2"></div>
        <div className="flex justify-between items-center text-sm text-white/80">
          <span>10 questions</span>
          <span>30 min</span>
        </div>
      </div>
    </Card>
  );
};

export default TopicCard;
