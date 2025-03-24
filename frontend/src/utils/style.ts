const getTextWeaknessColor = (percentage: number): string => {
  if (percentage >= 80) return "text-red-500";
  if (percentage >= 60) return "text-yellow-500";
  return "text-green-500";
};

const getBgWeaknessColor = (percentage: number): string => {
  if (percentage >= 80) return "bg-red-500";
  if (percentage >= 60) return "bg-yellow-500";
  return "bg-green-500";
};

export { getBgWeaknessColor, getTextWeaknessColor };
