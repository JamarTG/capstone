import LearningItem from "./LearningItem";
import { useTheme } from "../../context/ThemeContext";

const LearningPath = ({ items }: { items: any[] }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`w-full border rounded-lg p-6 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
      <h2 className={`text-xl font-medium mb-4 ${isDark ? "text-gray-100" : "text-slate-600"}`}>Learning Path</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <LearningItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
