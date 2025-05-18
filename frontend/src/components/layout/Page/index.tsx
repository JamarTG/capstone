import PageContainer from "./PageContainer";
import type { FC, ReactNode } from "react";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout: FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <PageContainer>
      <PageHeader title={title} />
      <PageBody>{children}</PageBody>
    </PageContainer>
  );
};

export default PageLayout;
