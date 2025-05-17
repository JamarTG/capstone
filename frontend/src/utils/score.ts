export const getScoreMessage = (percentage: number) => {
  if (percentage >= 90) return "Excellent!";
  if (percentage >= 80) return "Great job!";
  if (percentage >= 70) return "Good work!";
  if (percentage >= 60) return "Not bad!";
  if (percentage >= 50) return "Keep trying!";
  return "Room for improvement!";
};

export const getScorePercentage = (
  totalScore: number,
  totalQuestions: number,
) => {
  return totalQuestions > 0
    ? Math.ceil((totalScore / totalQuestions) * 100)
    : 0;
};
