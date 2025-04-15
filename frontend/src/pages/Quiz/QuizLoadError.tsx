import { Icon } from "@mdi/react";
import { mdiAlertCircle } from "@mdi/js";


const QuizLoadError = () => (
  <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
    <div className="p-6 bg-red-100 rounded-full">
      <Icon path={mdiAlertCircle} size={2} className="text-red-500" />
    </div>
    <h3 className="text-xl font-medium text-red-700">Failed to load quiz.</h3>
    <p className="text-gray-500 max-w-md">There was an issue loading the quiz. Please try again.</p>
  </div>
);

export default QuizLoadError;
