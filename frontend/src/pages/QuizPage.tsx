import { useState } from "react";
import PageContent from "../components/layout/PageLayout";
import { Topic, topics } from "../data/sample/topics";
import Card from "../components/ui/UICard";
import Button from "../components/ui/UIButton";
import useAuthRedirect from "../hook/useAuthRedirect";
import RenderList from "../components/common/RenderList";

const QuizPage = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResults, setShowResults] = useState(false);

  useAuthRedirect();

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

  const renderTopics = (topic: Topic) => (
    <Card
      key={topic.name}
      onClick={() => setSelectedSection(topic.name)}
      animateOnHover={false}
      className="shadow-md cursor-pointer flex flex-col justify-between items-center p-3 text-white rounded-lg"
      style={{
        backgroundImage: `url('${topic.backgroundImage}')`,
        backgroundSize: "cover",
      }}
    >
      <div className="p-3 flex justify-start items-end w-full h-64">
        <h2
          className="text-xl font-bold text-white truncate"
          title={topic.name}
        >
          {topic.name}
        </h2>
      </div>
      <hr className="text-red-600" />
    </Card>
  );
  const renderStartQuiz = () => {
    const selectedTopic = topics.find((topic) => topic.name === selectedSection);

    if (!selectedTopic) {
      return <div>No topic found!</div>;
    }

    return (
      <div>
        <h2 className="text-xl font-bold mb-4">{selectedTopic.name} Quiz</h2>

        {/* Objectives list */}
        <ul className="list-disc pl-5 mb-4">
          {selectedTopic.objectives.map((objective, index) => (
            <li
              key={index}
              className="text-lg text-gray-700"
            >
              {objective}
            </li>
          ))}
        </ul>

        <Button
          variant="primary"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </Button>
      </div>
    );
  };

  const renderQuiz = () => (
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
  );

  const renderResults = () => (
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
  );

  return (
    <PageContent
      title={"Quiz Section ..."}
      path="quiz"
    >
      <div className="p-6 w-full flex flex justify-center">
        {!selectedSection ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <RenderList
              data={topics}
              renderFn={renderTopics}
            />
          </div>
        ) : !quizStarted ? (
          renderStartQuiz()
        ) : !showResults ? (
          renderQuiz()
        ) : (
          renderResults()
        )}
      </div>
    </PageContent>
  );
};

export default QuizPage;
