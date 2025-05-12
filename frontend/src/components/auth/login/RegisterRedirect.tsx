import { Link } from "react-router-dom";
import routes from "../../../routes";

const RegisterRedirect = () => (
  <p className="mt-10 text-center text-lg text-gray-500">
    Not a member?{" "}
    <Link
      to={routes.REGISTER.path}
      className="text-gray-600 hover:text-gray-800"
    >
      Start your Journey
    </Link>
  </p>
);

export default RegisterRedirect;
