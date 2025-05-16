import type { FC, ReactNode } from "react";
import { useTheme } from "../../../hooks/useTheme";
import PageHeader from "./PageHeader";
import MainContent from "./MainContent";
import type { AuthProps } from "../Auth";

interface PageLayoutProps {
  children: ReactNode;
  title: AuthProps["title"];
}

const PageLayout: FC<PageLayoutProps> = ({ children, title }) => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <PageHeader title={title} />
      <MainContent>{children}</MainContent>
    </div>
  );
};

export default PageLayout;
