import Button from "../../../components/ui/Button";

interface RegisterButtonProps {
  isPending: boolean;
}

const RegisterButton = ({ isPending }: RegisterButtonProps) => {
  const buttonText = isPending ? "Registering..." : "Register";

  return (
    <Button
      variant="primary"
      type="submit"
      className="w-full rounded-md px-3 py-1.5 text-lg text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {buttonText}
    </Button>
  );
};

export default RegisterButton;
