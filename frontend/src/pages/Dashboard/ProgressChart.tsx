import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const ProgressChart = ({ data }: { data: any[] }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`w-full border rounded-lg p-6 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
      <div className="flex items-center mb-4">
        <h2 className={`text-xl font-medium ${isDark ? "text-gray-100" : "text-slate-600"}`}>Your Progress</h2>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
            <XAxis dataKey="date" stroke={isDark ? "#d1d5db" : "#6b7280"} />
            <YAxis domain={[0, 100]} stroke={isDark ? "#d1d5db" : "#6b7280"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#fff",
                borderColor: isDark ? "#4b5563" : "#e5e7eb",
                color: isDark ? "#f3f4f6" : "#111827",
              }}
            />
            <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
