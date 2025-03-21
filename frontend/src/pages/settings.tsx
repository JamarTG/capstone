import PageContent from "../components/layout/page-content";
import Button from "../components/ui/button";

const Settings = () => {
  return (
    <PageContent title="Settings">
      <div className="flex justify-center p-4">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Update Username/Email</h2>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            type="text"
            placeholder="Enter your username"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            type="email"
            placeholder="Enter your email"
          />
           <Button variant="primary" className="py-2 w-full">
            Update Username/Email
          </Button>
          <hr className="my-4" />
          <h2 className="text-2xl font-semibold mb-4">Update Your Password</h2>
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

          <Button variant="primary" className="py-2 w-full">
            Update Password
          </Button>
       
          <hr className="my-4" />
          <button className="w-full bg-gray-600 text-white p-2 rounded">
            Delete Account
          </button>
        </div>
      </div>
    </PageContent>
  );
};

export default Settings;
