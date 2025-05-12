import { useTheme } from "../../../context/ThemeContext";

interface PageHeaderProps {
  title:string
}

const PageHeader: React.FC<PageHeaderProps> = ({title}) => {
  
  const { isDark } = useTheme();

  return (
    <header className={`w-full z-10`}>
        <div className="container mx-auto px-4 py-4">
          <h1 className={`text-3xl  ${isDark ? "text-gray-100" : "text-slate-800"}`}>
            {title}
          </h1>
        </div>
      </header>
  )
}

export default PageHeader
