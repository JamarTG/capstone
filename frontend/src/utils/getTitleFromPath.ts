export const getTitleFromPath = (pathname: string) => {
  switch (pathname) {
    case "/login":
      return "Sign into your account";
    case "/register":
      return "Create an account";
    default:
      return "";
  }
};
