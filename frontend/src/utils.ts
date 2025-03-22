const getWeaknessColor = (percentage: number): string => {
  if (percentage >= 80) return "text-red-500";
  if (percentage >= 60) return "text-yellow-500";
  return "text-green-500";
};



  export { getWeaknessColor };