import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routes";

const RegisterRedirect: React.FC = () => (
  <p className="mt-10 text-center text-lg text-gray-500">
    Not a member?{" "}
    <Link to={ROUTE_PATHS.REGISTER} className="hover:text-gray-800 text-gray-600">
      Start your Journey
    </Link>
  </p>
);

export default RegisterRedirect;
