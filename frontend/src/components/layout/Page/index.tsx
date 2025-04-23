import { ReactNode } from "react";
import { useTheme } from "../../../context/ThemeContext";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <header className={`w-full z-10`}>
        <div className="container mx-auto px-4 py-4">
          <h1 className={`text-3xl  ${isDark ? "text-gray-100" : "text-slate-800"}`}>
            {title}
          </h1>
        </div>
      </header>

        <section className={`flex flex-col gap-2 p-4 rounded-lg ${isDark ? "bg-gray-800 text-white" : "bg-white text-slate-700"}`}>
          {children}
        </section>
  
    </div>
  );
};

export default PageLayout;
