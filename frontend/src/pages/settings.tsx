import { useEffect, useState } from "react";
import PageContent from "../components/layout/page-content";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInformation } from "../utils/api";
import useAuthRedirect from "../hook/useAuthRedirect";

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

  const { data } = useQuery({ queryKey: ["profile-data"], queryFn: fetchUserInformation });

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const toggleDarkMode = () => {
  //   setUser((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  // };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted!");
    }
  };

  return (
    <PageContent title="Settings">
      <div className="w-full flex justify-center gap-3 rounded-xl">
        <div className="grid gap-5 grid-cols-1 justify-center">
          <div className="p-6 rounded-xl bg-white  min-w-96">
            <h3 className="text-sm text-slate-600 font-semibold mb-3">Personal Information</h3>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mt-2 text-sm text-slate-600 font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={user.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mt-2 text-sm text-slate-600 font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={user.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block mt-2 text-sm text-slate-600 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter new email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="block mt-2 text-sm text-slate-600 font-medium">Old Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="block mt-2 text-sm text-slate-600 font-medium">New Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 focus:outline-none"
                />
              </div>
            </form>
          </div>

          <div className="grid grid-rows-2 gap-4 min-w-96">
            <div className="p-6 rounded-xl bg-white w-full">
              <h3 className="text-sm text-slate-600 font-semibold mb-3">Preferences</h3>
              <div className="mb-4 flex justify-between items-center">
                <span className="text-sm font-semibold">Dark Mode</span>

                <div className="relative inline-block w-14 h-6">
                  <input
                    id="switch-component-custom"
                    checked={user.darkMode}
                    type="checkbox"
                    className="peer appearance-none w-14 h-5 bg-slate-100 border border-slate-300 rounded-full checked:bg-slate-800 checked:border-slate-800 cursor-pointer transition-colors duration-300"
                  />
                  <label
                    htmlFor="switch-component-custom"
                    className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full border border-slate-300 shadow transition-transform duration-300 peer-checked:translate-x-7 peer-checked:border-slate-800 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-white w-full">
              {" "}
              {/* Reduced padding */}
              <h3 className="text-sm font-semibold mb-3 text-slate-600">Danger Zone</h3> {/* Reduced margin */}
              <button
                className="flex justify-start items-center gap-4 w-full"
                onClick={handleDelete}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="red"
                  width="24"
                  height="24"
                >
                  <path d="M9.5 3C9.22386 3 9 3.22386 9 3.5V4H5.5C5.22386 4 5 4.22386 5 4.5V5.5C5 5.77614 5.22386 6 5.5 6H18.5C18.7761 6 19 5.77614 19 5.5V4.5C19 4.22386 18.7761 4 18.5 4H15V3.5C15 3.22386 14.7761 3 14.5 3H9.5ZM6 7.5H18V19.5C18 20.3284 17.3284 21 16.5 21H7.5C6.67157 21 6 20.3284 6 19.5V7.5Z" />
                </svg>
                <p className="text-sm text-red-500">Delete Account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
}
