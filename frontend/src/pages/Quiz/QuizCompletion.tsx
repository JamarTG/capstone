import { Icon } from "@mdi/react";
import { mdiTrophy } from "@mdi/js";

const QuizCompletion = ({ score, totalQuestions, onRestart }: { score: number; totalQuestions: number; onRestart: () => void }) => {
  const isPassed = score / totalQuestions >= 0.6;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-xl p-8 max-w-md mx-auto mt-16">
      <div className="flex items-center justify-center mb-6">
        <div className={`p-4 rounded-full ${isPassed ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon path={mdiTrophy} size={3} className={`text-${isPassed ? 'green' : 'red'}-600`} />
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isPassed ? 'Congratulations!' : 'Better Luck Next Time!'}
      </h2>
      <p className="text-center mb-6 text-lg text-gray-700">
        You scored <span className={`font-bold text-${isPassed ? 'green' : 'red'}-600`}>{score}/{totalQuestions}</span>
      </p>
      <p className="text-center text-gray-500 mb-8">
        {isPassed ? 'You passed the quiz! Keep it up.' : 'Don’t worry, try again to improve your score!'}
      </p>
      <button
        onClick={onRestart}
        className="w-full py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors focus:outline-none"
      >
        {isPassed ? 'Take Another Quiz' : 'Retry Quiz'}
      </button>
    </div>
  );
};

export default QuizCompletion;
