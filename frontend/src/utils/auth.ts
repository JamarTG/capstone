import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("token", { path: "/" });
  localStorage.removeItem('user');
}

export { logout };
