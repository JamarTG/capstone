import { ReactNode } from "react";
import { useTheme } from "../../../hooks/useTheme";
import PageHeader from "./PageHeader";
import MainContent from "./MainContent";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <PageHeader title={title} />
      <MainContent>{children}</MainContent>
    </div>
  );
};

export default PageLayout;
