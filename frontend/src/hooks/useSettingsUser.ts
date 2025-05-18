import type { UserSettings } from "@/pages/Settings/types";
import { useEffect, useState } from "react";
import { useTheme } from "./useTheme";

// @ts-ignore
const useSettingsUser = (data: any) => {
  const { isDark } = useTheme();
  const [user, setUser] = useState<UserSettings>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    currentPassword: "",
    darkMode: isDark,
  });
  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  return { user, setUser };
};

export default useSettingsUser;
