import { useNavigate } from "react-router-dom";

interface PageContentProps {
  children: React.ReactNode;
  title: string;
}
const PageContent: React.FC<PageContentProps> = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="cursor-pointer flex justify-start items-center gap-5 text-3xl flex items-center">
        <svg
          onClick={() => navigate(-1)}
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          stroke="oklch(0.446 0.043 257.281)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-arrow-left-circle"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
          ></circle>
          <polyline points="12 8 8 12 12 16"></polyline>
          <line
            x1="16"
            y1="12"
            x2="8"
            y2="12"
          ></line>
        </svg>
        <p className="text-slate-600"> {title}</p>
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
