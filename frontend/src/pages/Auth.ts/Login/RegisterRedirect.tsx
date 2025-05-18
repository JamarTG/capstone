import { Link } from "react-router-dom";

const RegisterRedirect = () => (
  <p className="mt-10 text-center text-lg text-gray-500">
    Not a member?{" "}
    <Link to="/register" className="text-gray-600 hover:text-gray-800">
      Start your Journey
    </Link>
  </p>
);

export default RegisterRedirect;
