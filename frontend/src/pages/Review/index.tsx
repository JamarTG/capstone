import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QuizAPI } from "../../utils/api";
import PageLayout from "../../components/layout/Page";
import LoadingPage from "../../components/common/Loader";
import { useTheme } from "../../hooks/useTheme";
import QuestionSidebar from "../Quiz/QuestionSidebar";
import ReviewNavigation from "./ReviewNavigation";
import QuestionFeedback from "./QuestionFeedback";
import Score from "./Score";
import Explanation from "./Explanation";
import QuestionIndex from "./QuestionIndex";
import { getScorePercentage } from "../../utils/score";

const QuizReview = () => {

  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-quizzes", id],
    queryFn: () => QuizAPI.getQuizById(id!),
  });

  const { isDark } = useTheme();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (isLoading) {
    return <LoadingPage text={"Loading Answers..."} />;
  } else if (error) {
    return <div className="text-white">Error loading quiz data</div>;
  }

  const { session } = data || {};
  const questions = session?.questions || [];
  const question = questions[currentQuestionIndex];

  const totalScore = session?.score || 0;
  const totalQuestions = questions.length;
  const scorePercentage = getScorePercentage(totalScore, totalQuestions);

  return (
    <PageLayout title={"Quiz Review"}>
      <div className="flex flex-wrap space-x-8 gap-8">
        <QuestionSidebar
          isDark={isDark}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />

        <div className={`flex-1 p-8 rounded-lg border ${isDark ? "border-gray-600" : "border-gray-200"}`}>
          <div className="flex flex-row-reverse gap-10 justify-between">
            <ReviewNavigation
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
            />

            <Score
              scorePercentage={scorePercentage}
              totalScore={totalScore}
              totalQuestions={totalQuestions}
              isDark={isDark}
            />
          </div>

          {!!question && (
            <div className="p-6 rounded-lg min-h-64">
              <QuestionIndex
                currentQuestionIndex={currentQuestionIndex}
                question={question}
              />
              <QuestionFeedback
                question={question}
                isDark={isDark}
              />
              <Explanation
                question={question}
                isDark={isDark}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizReview;
