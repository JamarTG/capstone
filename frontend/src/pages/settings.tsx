import { useEffect, useState } from "react";
import Button from "../components/ui/button";
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
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    darkMode: false,
  });

  //   const [editField, setEditField] = useState<keyof User | null>(null);
  //   const [editValue, setEditValue] = useState<string | boolean>("");

  useAuthRedirect();

  const { data } = useQuery({
    queryKey: ["profile-data"],
    queryFn: fetchUserInformation,
  });

  useEffect(() => {
    if (data) {
      setUser({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
        password: data.data.password,
        darkMode: data.data.darkMode,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleDarkMode = () => {
    setUser((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted!");
    }
  };

  //   const openModal = (field: keyof User) => {
  //     setEditField(field);
  //     setEditValue(user[field]);
  //     // setIsModalOpen(true);
  //   };

  //   const closeModal = () => {
  //     // setIsModalOpen(false);
  //     setEditField(null);
  //     setEditValue("");
  //   };

  //   const handleSave = () => {
  //     if (editField) {
  //       setUser({ ...user, [editField]: editValue });
  //     }
  //     closeModal();
  //   };

  return (
    <PageContent title="Settings">
      <div className={`w-2/3 mx-auto p-6 rounded-xl shadow-lg ${user.darkMode ? "bg-gray-900 text-white" : "bg-white"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form className="mb-6">
            {/* <h3 className="text-lg text-slate-600 font-semibold mb-2">Profile</h3> */}
            <div className="mb-4">
              <label className="block mt-2 text-lg text-slate-600 font-medium">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter new first name"
                value={user.firstName}
                onChange={handleChange}
                // onClick={() => openModal("firstName")}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-lg text-slate-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
              />
            </div>
            <div className="mb-4">
              <label className="block mt-2 text-lg text-slate-600 font-medium">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter new last name"
                value={user.lastName}
                onChange={handleChange}
                // onClick={() => openModal("lastName")}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-lg text-slate-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-save"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>{" "}
              Save
            </Button>
          </form>

          <form className="mb-6">
            {/* <h3 className="text-lg text-slate-600 font-semibold mb-2">Contact Information</h3> */}
            <div className="mb-4">
              <label className="block mt-2 text-lg text-slate-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter new email"
                value={user.email}
                onChange={handleChange}
                // onClick={() => openModal("email")}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-lg text-slate-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-save"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save
            </Button>
          </form>

          <form className="mb-6">
            {/* <h3 className="text-lg text-slate-600 font-semibold mb-2">Security</h3> */}
            <div className="mb-4">
              <label className="block mt-2 text-lg text-slate-600 font-medium">New Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                // onClick={() => openModal("password")}
                placeholder="Enter new password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-lg text-slate-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-save"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>{" "}
              Save
            </Button>
          </form>

          <form className="mb-6">
            <h3 className="text-lg text-slate-600 font-semibold mb-2">Preferences</h3>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.darkMode}
                  onChange={toggleDarkMode}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-700"></div>
              </label>
            </div>
          </form>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-red-600">Danger Zone</h3>
            <Button
              variant="primary"
              size="lg"
              onClick={handleDelete}
              className="w-sm border-b-red-600 bg-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-trash-2"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line
                  x1="10"
                  y1="11"
                  x2="10"
                  y2="17"
                ></line>
                <line
                  x1="14"
                  y1="11"
                  x2="14"
                  y2="17"
                ></line>
              </svg>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </PageContent>
  );
}
