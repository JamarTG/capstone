import { useState } from "react";
import PageContent from "../components/layout/page-content";

const sections = ["Mathematics", "Science", "History", "Geography", "English", "Computing", "Physics", "Chemistry"];

const QuizPage = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Example timer (60 sec)
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
      <div className="p-6 max-w-xl mx-auto">
        {!selectedSection ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Select a Section</h2>
            <div className="grid grid-cols-2 gap-2">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {section}
                </button>
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
              {/* Quiz questions would be displayed here */}
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
