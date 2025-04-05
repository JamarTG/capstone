import { useState, useEffect } from "react";
import QuizCompletion from "./QuizCompletion";
import QuestionCard from "./QuestionCard";
import QuizHeader from "./QuizHeader";
import PageLayout from "../../components/layout/Page";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import { QuizSessionResponse } from "../../types/quiz";

const QuizSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const { id } = useParams();
  const location = useLocation();
  const sessionFromState = location.state?.session;

  const {
    data: session,
    isLoading,
    error,
    refetch,
  } = useQuery<QuizSessionResponse>({
    queryKey: ["quizSession", id],
    queryFn: () => QuizAPI.getQuizById(id!),
    initialData: sessionFromState,
    enabled: !!id,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (!session?.session?.createdAt) {
      refetch();
    }
  }, [session, refetch]);

  useEffect(() => {
    if (session?.session?.createdAt) {
      const startTime = new Date(session.session.createdAt).getTime();
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [session?.session?.createdAt]);

  if (isLoading && !sessionFromState) return <div>Loading quiz...</div>;
  if (error) return <div>Failed to load quiz.</div>;
  if (!session?.session) return <div>No session</div>;

  // Transform questions
  const questions = session.session.questions.map((q) => {
    const qData = q.questionId;

    return {
      id: qData._id,
      question: qData.text,
      options: qData.options,
      correctAnswer: qData.correctAnswer,
      explanation: qData.explanation,
      selectedOption: q.selectedOption,
      isCorrect: q.isCorrect,
      answeredAt: q.answeredAt,
    };
  });

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const selectedKey = Object.keys(currentQuestion.options)[selectedAnswer];
    const isCorrect = selectedKey === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSubmitQuiz = () => {
    alert("submitted quiz");
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
  };

  const remainingTime = Math.max(30 * 60 * 1000 - elapsedTime, 0);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60 / 1000);
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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

  return (
    <PageLayout title="Quiz">
      <div className="flex items-start justify-center h-[calc(100vh-4rem)] w-full overflow-hidden px-2">
        <div className="w-full max-w-4xl flex flex-col  gap-6">
          <QuizHeader
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            timeLeft={formatTime(remainingTime)}
          />

          <QuestionCard
            question={`${currentIndex + 1}. ${currentQuestion.question}`}
            answers={Object.values(currentQuestion.options)}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onSubmitQuiz={handleSubmitQuiz}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={isLastQuestion}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizSession;
