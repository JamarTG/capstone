import { Link } from "react-router-dom";
import routes from "../../../routes";

const LoginRedirect: React.FC = () => (
  <p className="mt-10 text-center text-lg text-gray-500">
    Already a member?{" "}
    <Link
      to={routes.LOGIN.path}
      className="hover:text-gray-800 text-gray-600"
    >
      Sign in
    </Link>
  </p>
);

export default LoginRedirect;
