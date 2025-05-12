export const formatDate = (date: string | Date): string => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
