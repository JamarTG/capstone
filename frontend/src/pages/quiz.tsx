import { useState } from "react";
import PageContent from "../components/layout/page-content";
import { topics } from "../data/sample/topics";
import Card from "../components/ui/card";
import Button from "../components/ui/button";

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
                  className="cursor-pointer w-full flex flex-col justify-between items-center p-4 border border-slate-200 text-slate-800 rounded-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex justify-start gap-3 items-center w-full">
                    <div>
                      <topic.icon className="w-12 h-12" />
                    </div>
                    <h2 className="text-sm font-bold">{topic.name}</h2>
                  </div>
                  <hr className="bg-red-700" />
                  <i className="text-slate-700 h-full mt-4 text-left text-sm">
                    {topic.description}
                  </i>
                
                </Card>
              ))}
            </div>
          </div>
        ) : !quizStarted ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedSection} Quiz</h2>
            <Button
              variant="primary"
        
              onClick={handleStartQuiz}
            >
              Start Quiz
            </Button>
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
