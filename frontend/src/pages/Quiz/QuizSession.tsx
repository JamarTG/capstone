import { useEffect, useState } from "react";
import QuizCompletion from "./QuizCompletion";
import questions from "../../data/sample/questions";
import QuestionCard from "./QuestionCard";
import QuizHeader from "./QuizHeader";
import PageLayout from "../../components/layout/Page";

const QuizSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 10); 

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    if (selectedAnswer === questions[currentIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(60 * 10);
    setQuizCompleted(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  if (quizCompleted) {
    return (
      <QuizCompletion
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestartQuiz}
      />
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <PageLayout title="Quiz">
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] w-full overflow-hidden px-4">
        <div className="w-full max-w-3xl flex flex-col gap-6">
          <QuizHeader
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            timeLeft={formatTime(timeLeft)} 
          />

          <QuestionCard
            question={`${currentIndex + 1}. ${currentQuestion.question}`}
            answers={currentQuestion.answers}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={isLastQuestion}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizSession;
