import { useState } from "react";
import QuizCompletion from "./QuizCompletion";
import questions from "../../data/sample/questions";
import QuestionCard from "./QuestionCard";
import QuizHeader from "./QuizHeader";

const QuizSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

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
    setQuizCompleted(false);
    setSelectedAnswer(null);
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
    <section className="max-w-1/2 flex flex-col gap-4 rounded-md h-3/4">
      <QuizHeader
        currentIndex={currentIndex}
        totalQuestions={questions.length}
      />
      <QuestionCard
        question={`${currentIndex + 1}. ${currentQuestion.question}`}
        answers={currentQuestion.answers}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={isLastQuestion}
      />
    </section>
  );
};

export default QuizSession;
