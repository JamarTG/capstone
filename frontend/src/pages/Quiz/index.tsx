import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContent from "../../components/layout/Page";
import { Topic, topics } from "../../data/sample/topics";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import useAuthRedirect from "../../hook/useAuthRedirect";
import RenderList from "../../components/common/RenderList";
import ObjectivesList from "./ObjectivesList";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiClipboard, mdiPlayCircleOutline } from "@mdi/js";
import { useMutation } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import { SuccessfulQuizResponse } from "../../types/auth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { extractErrorMessage } from "../../utils/error";

const QuizSelectionPage = () => {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useAuthRedirect();

  const onSuccess = ({message}: SuccessfulQuizResponse) => {
    toast.success(message);
    setSelectedTopicIndex(null);
  };

  const onError = (error: AxiosError) => {
    toast.error(extractErrorMessage(error));
    setSelectedTopicIndex(null);
  };
  
  const { mutate: createQuizMutate } = useMutation({
    mutationFn: QuizAPI.createQuiz,
    mutationKey: ["create-quiz"],
    onSuccess,
    onError,
  });

  const handleStartQuiz = () => {
    createQuizMutate({ topicId: "662fe4d2a0df3a6e4f21c3b2" });
    if (selectedTopicIndex !== null) {
      navigate(`/quiz/${selectedTopicIndex}`);
    }
  };

  const renderTopics = (topic: Topic, index: number) => (
    <Card
      key={topic.name}
      onClick={() => setSelectedTopicIndex(index)}
      animateOnHover={false}
      className={`w-70 h-20 border border-gray-200 rounded-lg relative flex flex-col min-h-[10rem] sm:min-h-[10rem] bg-white overflow-hidden p-0 transition-all duration-300 group`}
      style={{
        backgroundImage: `url('${topic.backgroundImage}')`,
        backgroundSize: "cover",
        height: "180px",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <h2 className="text-sm font-bold text-white">{topic.name}</h2>
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
    <PageContent title="Quiz">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <RenderList
            data={topics}
            renderFn={(topic, index) => <div>{renderTopics(topic, index)}</div>}
          />
        </div>

        <div className="flex rounded-lg justify-center items-center border border-gray-200 w-full lg:w-2/5 min-h-[400px]">
          {selectedTopic ? (
            <div className="bg-white w-full h-full rounded-lg p-6 sticky top-20 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Icon
                    path={mdiClipboard}
                    size={0.9}
                  />
                  {selectedTopic.name} Quiz
                </h2>

                <div className="border-b border-gray-200 mb-4"></div>

                <h4 className="text-sm text-gray-600 font-medium mb-2">Objectives</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                  <ObjectivesList selectedTopic={selectedTopic} />
                </ul>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant="secondary"
                  onClick={() => setSelectedTopicIndex(null)}
                >
                  <Icon
                    path={mdiArrowLeft}
                    size={0.8}
                    className="mr-2"
                  />
                  Back to Topics
                </Button>
                <Button
                  variant="primary"
                  onClick={handleStartQuiz}
                >
                  <Icon
                    path={mdiPlayCircleOutline}
                    size={0.9}
                    className="mr-2"
                  />
                  Start Quiz
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-sm italic mt-4 px-4 text-center w-full">Select a topic to view details.</div>
          )}
        </div>
      </div>
    </PageContent>
  );
};

export default QuizSelectionPage;
