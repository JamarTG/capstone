interface PageContentProps {
  children: React.ReactNode;
  title: string;
}
const PageContent: React.FC<PageContentProps> = ({ children, title }) => {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">{title.toLocaleLowerCase()}</h1>
      <section
        style={{ width: "90vw", height: "85vh" }}
        className="border-2 border-slate-300 rounded-lg bg-gray-50 flex flex-col h-full p-4 gap-5 "
      >
        {children}
      </section>
    </div>
  );
};

export default PageContent;
