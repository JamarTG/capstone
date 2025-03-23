import { useState } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "",
    darkMode: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleDarkMode = () => {
    setUser((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted!");
      // Simulate API call
    }
  };

  return (
    <div className={`max-w-lg mx-auto p-6 rounded-xl shadow-lg ${user.darkMode ? "bg-gray-900 text-white" : "bg-white"}`}>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      {/* Profile Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Profile</h3>
        <label className="block mt-2 text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-black"
        />
        <label className="block mt-2 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-black"
        />
      </div>

      {/* Security */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Security</h3>
        <label className="block mt-2 text-sm font-medium">New Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter new password"
          className="w-full p-2 border rounded-lg text-black"
        />
      </div>

      <div className="mb-4 flex justify-between items-center">
        <span className="text-lg font-semibold">Dark Mode</span>
        <button
          onClick={toggleDarkMode}
          className={`px-3 py-1 rounded-full text-white ${user.darkMode ? "bg-slate-800" : "bg-slate-400"}`}
        >
          {user.darkMode ? "ON" : "OFF"}
        </button>
      </div>

      {/* Delete Account */}
      <button
        onClick={handleDelete}
        className="w-full py-2 mt-4 bg-red-600 text-white font-semibold rounded-lg"
      >
        Delete Account
      </button>
    </div>
  );
}
