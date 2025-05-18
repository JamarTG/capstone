import { Link } from "react-router-dom";
import type { FC } from "react";

const LoginRedirect: FC = () => (
  <p className="mt-10 text-center text-lg text-gray-500">
    Already a member?{" "}
    <Link to="/login" className="hover:text-gray-800 text-gray-600">
      Sign in
    </Link>
  </p>
);

export default LoginRedirect;
