import Icon from "@mdi/react";
import { mdiCheckCircle, mdiVideo, mdiFileDocument } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";

const LearningItem = ({ item }: { item: any }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`border rounded-lg p-4 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-medium ${isDark ? "text-gray-100" : "text-slate-600"}`}>
          {item.topic} ({item.mastery}%)
        </h3>
        <div className="flex space-x-2">
          {item.resources.map((res: any, i: number) => (
            <span
              key={i}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isDark ? "bg-gray-800 text-gray-300" : "bg-slate-100 text-slate-600"
              }`}
            >
              <Icon
                path={
                  res.type === "quiz"
                    ? mdiCheckCircle
                    : res.type === "video"
                    ? mdiVideo
                    : mdiFileDocument
                }
                size={0.6}
                className="mr-1"
              />
              {res.count} {res.type}
            </span>
          ))}
        </div>
      </div>
      <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>{item.description}</p>
    </div>
  );
};

export default LearningItem;
