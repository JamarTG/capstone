interface PageContentProps {
  children: React.ReactNode;
  title: string;
}
const PageContent: React.FC<PageContentProps> = ({ children, title }) => {
  return (
    <div>
      <h1 className="pl-4 mb-2 text-2xl font-bold">{title}</h1>
      <section
        style={{ width: "90vw", height: "85vh" }}
        className="border border-slate-200 rounded-lg bg-gray-100 flex flex-col h-full p-4 gap-5 "
      >
        {children}
      </section>
    </div>
  );
};

export default PageContent;
