import PageContent from "../components/layout/page-content";
import QuizCard from "../components/quiz/quiz-result";
import SelectDropdown from "../components/ui/select-dropdown";

const QuizHistory = () => {
  return (
    <PageContent title="Quiz History">
      <SelectDropdown options={["date", "score"]} />
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 overflow-auto h-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <QuizCard key={index} />
        ))}
      </div>
    </PageContent>
  );
};

export default QuizHistory;
