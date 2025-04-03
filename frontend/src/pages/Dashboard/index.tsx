import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mdiChartLine, mdiVideo, mdiFileDocument, mdiCheckCircle } from "@mdi/js";
import Icon from "@mdi/react";
import PageLayout from "../../components/layout/Page";

const QuizDashboard = () => {
  const userData = {
    name: "Alex Johnson",
    scoreTrend: [
      { date: "Jun 1", score: 72 },
      { date: "Jun 8", score: 75 },
      { date: "Jun 15", score: 78 },
      { date: "Jun 22", score: 82 },
      { date: "Jun 29", score: 85 },
    ],
    subjectPerformance: [
      { name: "Math", value: 75 },
      { name: "Science", value: 82 },
      { name: "Language", value: 68 },
    ],
    learningPath: {
      items: [
        {
          topic: "Trigonometry",
          mastery: 65,
          description: "Focus on trigonometric identities",
          resources: [
            { type: "quiz", count: 3 },
            { type: "video", count: 2 },
          ],
        },
        {
          topic: "Chemical Equations",
          mastery: 72,
          description: "Practice balancing equations",
          resources: [
            { type: "quiz", count: 2 },
            { type: "article", count: 1 },
          ],
        },
      ],
    },
  };

  return (
    <PageLayout>
      <div className="flex flex-col px-4 py-6 space-y-5">
        <div className="w-full border-1 border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Icon
              path={mdiChartLine}
              size={1}
              className="text-slate-600 mr-2"
            />
            <h2 className="text-xl font-medium text-slate-600">Your Progress</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={userData.scoreTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#6b7280"
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full border-1 border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-medium text-slate-600 mb-4">Learning Path</h2>
          <div className="space-y-4">
            {userData.learningPath.items.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-slate-600">
                    {item.topic} ({item.mastery}%)
                  </h3>
                  <div className="flex space-x-2">
                    {item.resources.map((res, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
                      >
                        {res.type === "quiz" ? (
                          <Icon
                            path={mdiCheckCircle}
                            size={0.6}
                            className="mr-1"
                          />
                        ) : res.type === "video" ? (
                          <Icon
                            path={mdiVideo}
                            size={0.6}
                            className="mr-1"
                          />
                        ) : (
                          <Icon
                            path={mdiFileDocument}
                            size={0.6}
                            className="mr-1"
                          />
                        )}
                        {res.count} {res.type}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizDashboard;
