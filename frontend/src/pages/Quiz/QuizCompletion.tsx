const QuizCompletion = ({ score, totalQuestions, onRestart }: { score: number; totalQuestions: number; onRestart: () => void }) => {
  return (
    <div className="bg-slate-50 rounded-lg border border-gray-200 shadow-md p-8">
      <h2 className="text-xl font-semibold mb-4">Quiz Complete!</h2>
      <p className="mb-4">
        Score: {score}/{totalQuestions}
      </p>
      <button
        onClick={onRestart}
        className="w-full py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizCompletion;
