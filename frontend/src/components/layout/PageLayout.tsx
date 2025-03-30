import { ReactNode } from "react";
import ConditionalSVG from "../ConditionalSVG";

interface PageContentProps {
  children: ReactNode;
  title: string;
  path: string;
}

const PageLayout: React.FC<PageContentProps> = ({ children, title, path }) => {
  return (
    <div>
      <div className="p-2 cursor-pointer flex justify-start items-center text-3xl">
        <span className="mr-3">
          {path && (
            <ConditionalSVG
              path={path}
              size={50}
            />
          )}
        </span>
        <h1 className="text-gray-500 text-2xl">{title}</h1>
      </div>

      <section       
        className="page-content-dim flex flex-col h-screen p-4 gap-5  border-t-2 border-slate-200"
      >
        {children}
      </section>
    </div>
  );
};

export default PageLayout;
