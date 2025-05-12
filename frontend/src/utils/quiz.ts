export const getMessage = (filter: string) => {
  switch (filter) {
    case "completed":
      return {
        title: "No completed quizzes",
        description: "You haven't completed any quizzes yet.",
      };
    case "incomplete":
      return {
        title: "No quizzes in progress",
        description: "You don't have any ongoing quizzes.",
      };
    default:
      return {
        title: "No quiz history yet",
        description: "Your completed quizzes will appear here. Take your first quiz to get started!",
      };
  }
};
