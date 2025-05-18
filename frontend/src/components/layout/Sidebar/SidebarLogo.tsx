import { useNavigate } from "react-router-dom";

const SidebarLogo = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate("/");
  
  return <img onClick={goToHome} src="/logo.png" width={60} alt="Logo" />;
};

export default SidebarLogo;
