export const dashboardData = {
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
