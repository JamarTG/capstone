import QuizCard from "../components/quiz/quiz-result";
import SelectDropdown from "../components/ui/select-dropdown";

const QuizHistory = () => {
  return (
    <section className="flex flex-col h-full p-4 gap-5">
      <header>
        <h1 className="text-2xl font-bold">Quiz History</h1>
      </header>
      <SelectDropdown options={['date','score']} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-auto h-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <QuizCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default QuizHistory;
