import { useState, useEffect } from "react";
import QuizCompletion from "./QuizCompletion";
import questionsFallback from "../../data/sample/questions";
import QuestionCard from "./QuestionCard";
import QuizHeader from "./QuizHeader";
import PageLayout from "../../components/layout/Page";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";

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
  } = useQuery({
    queryKey: ["quizSession", id],
    queryFn: () => QuizAPI.getQuizById(id!),
    initialData: sessionFromState,
    enabled: !!id,
    refetchOnMount: true,
  });

  const questions = session?.questions || questionsFallback;

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
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
    setQuizCompleted(false);
  };


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

  if (quizCompleted) {
    return (
      <QuizCompletion
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestartQuiz}
      />
    );
  }

  if(!session?.session) {
    return <div>no session</div>

  } 

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const remainingTime = Math.max(30 * 60 * 1000 - elapsedTime, 0); 

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60 / 1000); 
    const seconds = Math.floor((time % (60 * 1000)) / 1000); 
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <PageLayout title="Quiz">
      {/* {session?.session?.questions ? JSON.stringify(session.session.questions) : ""} */}
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] w-full overflow-hidden px-4">
        <div className="w-full max-w-3xl flex flex-col gap-6">
          <QuizHeader
            currentIndex={currentIndex}
            totalQuestions={session.session.questions.length}
            timeLeft={formatTime(remainingTime)} 
          />
          
          <QuestionCard
            question={`${currentIndex + 1}. ${currentQuestion.question || currentQuestion.text}`}
            answers={currentQuestion.answers || Object.values(currentQuestion.options || {})}
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
