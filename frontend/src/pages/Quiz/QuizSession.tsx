import { useState, useEffect } from "react";
import QuizCompletion from "./QuizCompletion";
import QuestionCard from "./QuestionCard";
import QuizHeader from "./QuizHeader";
import PageLayout from "../../components/layout/Page";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import { QuizSessionResponse } from "../../types/quiz";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { extractErrorMessage } from "../../utils/error";
import { SuccessfulQuizResponse } from "../../types/auth";

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

  const onSuccess = ({message}: SuccessfulQuizResponse) => {
    toast.success(message);
  }
  const onError = (error: AxiosError) => {
    toast.error(extractErrorMessage(error));
  }

  const { mutate: submitAnswerMutation } = useMutation({
    mutationFn: QuizAPI.submitAnswer,
    mutationKey: ["register"],
    onSuccess,
    onError
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
    if(session.session.currentQuestionIndex + 1 >= session.session.questions.length) {
      alert("Done")
    }
    if (selectedAnswer === null) {
      submitAnswerMutation({
        quiz: session.session._id,
        question: currentQuestion.id,
        selectedOption: "", 
      });
    } else {
      const selectedKey = Object.keys(currentQuestion.options)[selectedAnswer];
      const isCorrect = selectedKey === currentQuestion.correctAnswer;

      submitAnswerMutation({
        quiz: session.session._id,
        question: currentQuestion.id,
        selectedOption: selectedKey, // Selected answer
      });

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
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

  if(session.session.currentQuestionIndex >= session.session.questions.length) {
    return <>Done</>
  }

  return (
    <PageLayout title="Quiz">
      {/* {JSON.stringify(questions)} */}
    {session.session.questions.length}
      {session.session.currentQuestionIndex}
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
