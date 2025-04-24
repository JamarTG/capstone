import Button from "../../ui/Button";

interface RegisterButtonProps {
  isPending: boolean;
}

const renderRegisterButtonText = (isPending: boolean) => {
  return isPending ? "Registering..." : "Register";
};

const RegisterButton: React.FC<RegisterButtonProps> = ({ isPending }) => (
  <Button
    variant="primary"
    type="submit"
    className="flex w-full justify-center rounded-md px-3 py-1.5 text-lg text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    {renderRegisterButtonText(isPending)}
  </Button>
);

export default RegisterButton;
