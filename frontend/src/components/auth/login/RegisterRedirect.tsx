import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routes";

const RegisterRedirect = () => (
  <p className="mt-10 text-center text-lg text-gray-500">
    Not a member?{" "}
    <Link to={ROUTE_PATHS.REGISTER} className="text-gray-600 hover:text-gray-800">
      Start your Journey
    </Link>
  </p>
);

export default RegisterRedirect;