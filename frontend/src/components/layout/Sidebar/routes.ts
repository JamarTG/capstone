import { IconifyIcons } from "@/icons";

export const mainRoutes = {
  HOME: {
    path: "/",
    text: "Dashboard",
    icon: IconifyIcons.viewDashboard,
  },
  ARCHIVE: {
    path: "/archive",
    text: "Archive",
    icon: IconifyIcons.archive,
  },
  QUIZ: {
    path: "/quiz",
    text: "Quiz",
    icon: IconifyIcons.clipboardList,
  },
};

export const otherRoutes = {
  SETTINGS: {
    path: "/settings",
    text: "Settings",
    icon: IconifyIcons.cog,
  },
  LOGOUT: {
    text: "Logout",
    icon: IconifyIcons.logout,
  },
};