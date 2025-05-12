import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";
import routes from "../../data/routes";

const NotFound = () => {
   const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center px-4 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link
        to={routes.NOT_FOUND.path}
        className={`px-4 py-2 rounded-md shadow text-sm font-medium ${
          isDark
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
