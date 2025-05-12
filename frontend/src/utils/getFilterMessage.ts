type FilterType = "completed" | "incomplete";

const filterMessages = {
  completed: {
    title: "No completed quizzes",
    description: "You haven't completed any quizzes yet.",
  },
  incomplete: {
    title: "No quizzes in progress",
    description: "You don't have any ongoing quizzes.",
  },
  default: {
    title: "No quiz history yet",
    description: "Your completed quizzes will appear here. Take your first quiz to get started!",
  },
};

export const getFilterMessage = (filter: string) => {
  return filterMessages[filter as FilterType] || filterMessages.default;
};