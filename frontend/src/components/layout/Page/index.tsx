import type { FC, ReactNode } from "react";
import PageHeader from "./PageHeader";
import { useTheme } from "@/hooks";
import PageBody from "./PageBody";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout: FC<PageLayoutProps> = ({ children, title }) => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <PageHeader title={title} />
      <PageBody>{children}</PageBody>
    </div>
  );
};

export default PageLayout;
