import { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
  title: string;
  svg?: ReactNode; 
}

const PageLayout: React.FC<PageContentProps> = ({ children, title, svg }) => {
  return (
    <div>
      <h1 className="p-2 cursor-pointer flex justify-start items-center text-3xl">
        <span className="mr-3">
          {svg}
        </span>
        <h2 className="text-gray-500 text-2xl">{title}</h2>
      </h1>
      <section
        style={{ width: "90vw", height: "90vh" }}
        className="flex flex-col h-screen p-4 gap-5  border-t-2 border-slate-200"
      >
        {children}
      </section>
    </div>
  );
};

export default PageLayout;
