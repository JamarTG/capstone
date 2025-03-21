import PageContent from "../components/layout/page-content";
import Button from "../components/ui/button";
import { user } from "../data/user";

const Settings = () => {
  return (
    <PageContent title="Settings">
      <div className="flex flex-col items-center gap-4">
        <div className="border border-slate-200 rounded-lg p-4 w-full max-w-md">
          <div className="mb-4"></div>
          <h2 className="text-2xl">{user.username}</h2>
          <p className="text-slate-500">{user.email}</p>
          <small className="text-slate-500">Joined on {user.joinedDate}</small>
          <hr className="my-4 border-slate-200" />
          <h2 className="text-md text-slate-800 font-semibold mb-4">Update Your Username</h2>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            type="text"
            placeholder="Enter your username"
          />
          <Button
            variant="primary"
            className="py-2 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Save Username
          </Button>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 w-full max-w-md">
          <h2 className="text-md text-slate-800 font-semibold mb-4">Update Your Password</h2>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            type="password"
            placeholder="Enter new password"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            type="password"
            placeholder="Confirm new password"
          />
          <Button
            variant="primary"
            className="py-2 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Save New Password
          </Button>
          <hr className="my-4 border-slate-200" />
          <Button
            variant="secondary"
            className="w-full bg-red-500 text-white py-2"
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
            </svg>{" "}
            Delete Account
          </Button>
        </div>
      </div>
    </PageContent>
  );
};

export default Settings;
