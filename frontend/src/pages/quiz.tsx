import { useState } from "react";
import PageContent from "../components/layout/page-content";
import { topics } from "../data/sample/topics";
import Card from "../components/ui/card";

const QuizPage = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResults, setShowResults] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    let timer = 60;
    const countdown = setInterval(() => {
      timer--;
      setTimeLeft(timer);
      if (timer === 0) {
        clearInterval(countdown);
        setShowResults(true);
      }
    }, 1000);
  };

  return (
    <PageContent title={"Quiz"}>
      <div className="p-6  w-full">
        {!selectedSection ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Select a Topic</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topics.map((topic) => (
              <Card
                key={topic.name}
                onClick={() => setSelectedSection(topic.name)}
                className="w-full h-64 flex flex-col justify-center items-center px-2 py-1 border border-slate-200 text-slate-800 rounded-lg transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center justify-center  w-full h-full p-4">
                <div className="h-24 w-24 mb-4 w-full flex justify-center items-center">{<topic.icon />}</div>
                <h2 className="text-center text-lg font-semibold">{topic.name}</h2>
                </div>
              </Card>
              ))}
            </div>
          </div>
        ) : !quizStarted ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedSection} Quiz</h2>
            <button
              onClick={handleStartQuiz}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Start Quiz
            </button>
          </div>
        ) : !showResults ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedSection} Quiz</h2>
            <p className="text-lg font-semibold text-red-500">Time Left: {timeLeft}s</p>
            <div className="mt-4">
              <p>Question 1: Example question?</p>
              <div className="flex gap-2 mt-2">
                <button className="px-4 py-2 bg-gray-200 rounded">Option A</button>
                <button className="px-4 py-2 bg-gray-200 rounded">Option B</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
            <p>Your score: 80%</p>
            <button
              onClick={() => {
                setSelectedSection(null);
                setQuizStarted(false);
                setShowResults(false);
                setTimeLeft(60);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default QuizPage;
