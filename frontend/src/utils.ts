const getWeaknessColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };


  export { getWeaknessColor };