import { useNavigate } from "react-router-dom";

interface PageContentProps {
  children: React.ReactNode;
  title: string;
}
const PageContent: React.FC<PageContentProps> = ({ children, title }) => {

  const navigate = useNavigate();
  return (
    <div >
      <h1 className=" text-2xl font-bold flex items-center">
        <svg
          onClick={() => {
            navigate(-1);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-left cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110 active:scale-90"
        >
          <line
            x1="19"
            y1="12"
            x2="5"
            y2="12"
          ></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>{" "}
        {title}
      </h1>
      <section
        style={{ width: "90vw", height: "90vh" }}
        className="flex flex-col h-full p-4 gap-5 "
      >
        {children}
      </section>
    </div>
  );
};

export default PageContent;
