const RightAuthScreen = () => {
  return (
    <div className="hidden lg:flex w-1/2 items-center justify-center bg-white">
      <div className="flex flex-col items-center text-center px-10">
        <img
          src="/student.jpg"
          alt="Learning"
          className="w-72 h-auto mb-6"
        />
        <h2 className="text-3xl font-semibold text-slate-700">Unlock Your Potential</h2>
        <p className="text-lg text-gray-500 mt-3 max-w-md">
          Learn smarter, grow faster. Our platform helps you prepare with confidence and ease.
        </p>
      </div>
    </div>
  );
};

export default RightAuthScreen;
