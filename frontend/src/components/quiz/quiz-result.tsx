import Button from "../ui/button";

const QuizCard = () => {
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="p-4 flex flex-col">
        <h1 className="text-2xl">
          <span className="text-2xl text-green-600">95%</span>{" "}
        </h1>

        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 text-gray-600 text-sm font-medium px-2.5 py-0.5 rounded-full">Excel</span>
          <span className="bg-gray-100 text-gray-600 text-sm font-medium px-2.5 py-0.5 rounded-full">Computer Systems</span>
          <span className="bg-gray-100 text-gray-600 text-sm font-medium px-2.5 py-0.5 rounded-full">SBA</span>
          <span className="bg-gray-100 text-gray-600 text-sm font-medium px-2.5 py-0.5 rounded-full">Devices</span>
        </div>

        <div className="flex  items-center gap-5">
          <Button variant="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-refresh-ccw"
            >
              <polyline points="1 4 1 10 7 10" />
              <polyline points="23 20 23 14 17 14" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            Retry
          </Button>

          <Button variant="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-file-text"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line
                x1="16"
                y1="13"
                x2="8"
                y2="13"
              />
              <line
                x1="16"
                y1="17"
                x2="8"
                y2="17"
              />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Review
          </Button>
        </div>

        <div className="mt-3 mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
          <span className="text-sm text-slate-600 font-medium">Last attempt: 4 hours ago • 10 questions</span>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
