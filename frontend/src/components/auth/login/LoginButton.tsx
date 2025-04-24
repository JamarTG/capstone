import React from "react";
import Button from "../../ui/Button";

interface LoginButtonProps {
  isPending: boolean;
}

const renderLoginButtonText = (isPending: boolean) => {
  return isPending ? "Signing in..." : "Sign in";
}

const LoginButton: React.FC<LoginButtonProps> = ({ isPending }) => (
  <div>
    <Button
      variant="primary"
      type="submit"
      className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-lg/6  text-gray-200 shadow-xs"
    >
      {renderLoginButtonText(isPending)}
    </Button>
  </div>
);

export default LoginButton;
