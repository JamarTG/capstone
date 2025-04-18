import { useEffect, useState } from "react";
import QuizCompletion from "./QuizCompletion";
import QuestionCard from "./QuestionCard";
import QuizHeader from "./QuizHeader";
import PageLayout from "../../components/layout/Page";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import { QuizSessionResponse } from "../../types/quiz";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { extractErrorMessage } from "../../utils/error";
import { SuccessfulQuizResponse } from "../../types/auth";
import Loader from "../../components/common/Loader";
import QuizLoadError from "./QuizLoadError";

const QuizSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const sessionFromState = location.state?.session;
  const navigate = useNavigate();

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

  const { mutate: autoSubmitMutation, isPending } = useMutation({
    mutationFn: QuizAPI.autoSubmit,
  });

  const { mutate: submitAnswerMutation } = useMutation({
    mutationFn: QuizAPI.submitAnswer,
    onSuccess: ({ message }: SuccessfulQuizResponse) => toast.success(message),
    onError: (error: AxiosError) => toast.error(extractErrorMessage(error)),
  });

  useEffect(() => {
    if (!session?.session?.createdAt) {
      refetch();
    }
  }, [session, refetch]);

  if (isLoading || !session?.session) return <Loader text="Loading Quiz Session" />;
  if (error) return <QuizLoadError />;

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

  const handleAnswerSelect = (index: number) => setSelectedAnswer(index);

  const handleNextQuestion = () => {
    const selectedKey =
      selectedAnswer !== null ? Object.keys(currentQuestion.options)[selectedAnswer] : "";

    const isCorrect = selectedKey === currentQuestion.correctAnswer;

    submitAnswerMutation({
      quiz: session.session._id,
      question: currentQuestion.id,
      selectedOption: selectedKey,
      score: isCorrect ? score + 1 : score,
    });

    if (isCorrect) setScore((prev) => prev + 1);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      autoSubmitMutation(session.session._id);
      navigate(`/review/${session.session._id}`);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setModalVisible(false);
  };

  return (
    <PageLayout title="Quiz">
      {quizCompleted && modalVisible ? (
        <QuizCompletion
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestartQuiz}
        />
      ) : (
        <div className="relative w-full h-full">
          <div className="flex items-start justify-center h-[calc(100vh-4rem)] w-full overflow-hidden px-2">
            <div className="w-full max-w-4xl flex flex-col gap-6">
              <QuizHeader
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                onSubmitQuiz={() => {
                  setQuizCompleted(true);
                  setModalVisible(true);
                  autoSubmitMutation(session.session._id);
                  navigate(`/review/${session.session._id}`);
                }}
                isSubmitting={isPending}
              />
              <QuestionCard
                question={`${currentIndex + 1}. ${currentQuestion.question}`}
                answers={Object.values(currentQuestion.options)}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
                onNextQuestion={handleNextQuestion}
                isLastQuestion={isLastQuestion}
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default QuizSession;
