import { useTheme } from "@/hooks";

const SidebarSeparator = () => {
  const { isDark } = useTheme();
  return (
    <div
      className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
    />
  );
};

export default SidebarSeparator;
