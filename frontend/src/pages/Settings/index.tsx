// SettingsPage.tsx
import { useEffect, useState } from "react";
import PageContent from "../../components/layout/Page";
import { useQuery } from "@tanstack/react-query";
import useAuthRedirect from "../../hook/useAuthRedirect";
import { UserAPI } from "../../utils/api";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import Preferences from "./Preferences";
import DeleteAccount from "./DeleteAccount";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  darkMode: boolean;
}

export default function SettingsPage() {
  useAuthRedirect();

  const [user, setUser] = useState<User>({
    firstName: "Jamari",
    lastName: "McFarlane",
    email: "jamarimcfarlane12@gmail.co",
    password: "",
    darkMode: false,
  });

  const { data } = useQuery({ queryKey: ["profile-data"], queryFn: UserAPI.fetchUserInfo });

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted!");
    }
  };

  const toggleDarkMode = () => {
    setUser((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const savePersonalInfo = () => {
    alert("Personal information saved!");
  };

  const savePassword = () => {
    alert("Password saved!");
  };


  return (
    <PageContent>
      <div className="w-full flex flex-col gap-2 justify-center gap-3 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 w-full justify-center">
          <PersonalInformation user={user} handleChange={handleChange} savePersonalInfo={savePersonalInfo} />
          <ChangePassword user={user} handleChange={handleChange} savePassword={savePassword} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <Preferences darkMode={user.darkMode} toggleDarkMode={toggleDarkMode} />
          <DeleteAccount handleDelete={handleDelete} />
        </div>
      </div>
    </PageContent>
  );
}
