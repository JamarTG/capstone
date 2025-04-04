import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-white">

      <header className="sticky top-0 z-10 border-b border-gray-200">
        <div className="bg-white container mx-auto px-4 py-4">
          <h1 className="text-lg font-semibold text-slate-600">
            {title}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <section className="flex flex-col gap-5 p-4 rounded-lg ">
          {children}
        </section>
      </main>
    </div>
  );
};

export default PageLayout;