import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routes";

const LoginRedirect: React.FC = () => (
  <p className="mt-10 text-center text-lg text-gray-500">
    Already a member?{" "}
    <Link to={ROUTE_PATHS.LOGIN} className="hover:text-gray-800 text-gray-600">
      Sign in
    </Link>
  </p>
);

export default LoginRedirect;
