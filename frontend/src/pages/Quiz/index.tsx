import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContent from "../../components/layout/Page";
import { Topic, topics } from "../../data/sample/topics";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import useAuthRedirect from "../../hook/useAuthRedirect";
import RenderList from "../../components/common/RenderList";

const QuizSelectionPage = () => {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useAuthRedirect();

  const handleStartQuiz = () => {
    if (selectedTopicIndex !== null) {
      navigate(`/quiz/${selectedTopicIndex}`);
    }
  };

  const renderTopics = (topic: Topic, index: number) => (
    <Card
      key={topic.name}
      onClick={() => setSelectedTopicIndex(index)}
      animateOnHover={false}
      className={`w-96 h-32  relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
        selectedTopicIndex === index ? "ring-2 ring-blue-400" : ""
      }`}
      style={{
        backgroundImage: `url('${topic.backgroundImage}')`,
        backgroundSize: "cover",

        height: "180px",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <h2 className="text-sm font-bold text-white truncate">{topic.name}</h2>
        <div className="w-full h-px bg-white/20 my-2"></div>
        <div className="flex justify-between items-center text-sm text-white/80">
          <span>{10} questions</span>
          <span>30 min</span>
        </div>
      </div>
    </Card>
  );

  const selectedTopic = selectedTopicIndex !== null ? topics[selectedTopicIndex] : null;

  return (
    <PageContent>
      <div className="w-full flex justify-center">
        {selectedTopic ? (
          <div className="max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">{selectedTopic.name} Quiz</h2>
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
            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => setSelectedTopicIndex(null)}
              >
                Back to Topics
              </Button>
              <Button
                variant="primary"
                onClick={handleStartQuiz}
              >
                Start Quiz
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-2 p-1">
            <RenderList
              data={topics}
              renderFn={(topic, index) => <div>{renderTopics(topic, index)}</div>}
            />
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default QuizSelectionPage;
