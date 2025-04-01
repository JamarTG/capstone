import { ReactNode } from "react";
import React from "react";

interface PageContentProps {
  children: ReactNode;
  title: string;
}

const PageLayout: React.FC<PageContentProps> = ({ children, title }) => {
  return (
    <React.Fragment>
      <div className="p-2 cursor-pointer flex justify-start items-center text-3xl">
        <span className="mr-3">
        </span>
        <h1 className="text-gray-500 text-2xl">{title}</h1>
      </div>
      <section className="page-content-dim flex flex-col h-screen p-4 gap-5  border-t-2 border-slate-200">{children}</section>
    </React.Fragment>
  );
};

export default PageLayout;
