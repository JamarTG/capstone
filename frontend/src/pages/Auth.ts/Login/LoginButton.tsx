import Button from "../../../components/ui/Button";

interface LoginButtonProps {
  isPending: boolean;
}

const LoginButton = ({ isPending }: LoginButtonProps) => {
  const buttonText = isPending ? "Signing in..." : "Sign in";

  return (
    <Button
      variant="primary"
      type="submit"
      className="w-full rounded-md bg-gray-600 px-3 py-1.5 text-lg text-gray-200 shadow-xs"
    >
      {buttonText}
    </Button>
  );
};

export default LoginButton;
