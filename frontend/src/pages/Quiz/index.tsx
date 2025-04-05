import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContent from "../../components/layout/Page";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import useAuthRedirect from "../../hook/useAuthRedirect";
import RenderList from "../../components/common/RenderList";
import ObjectivesList from "./ObjectivesList";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiClipboard, mdiPlayCircleOutline } from "@mdi/js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import { SuccessfulQuizResponse } from "../../types/auth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { extractErrorMessage } from "../../utils/error";
import { Topic } from "./QuizCard";

const QuizSelectionPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const navigate = useNavigate();

  useAuthRedirect();

  const onCreateQuizSuccess = ({ message, session }: SuccessfulQuizResponse) => {
    toast.success(message);
    setSelectedTopic(null);
    navigate(`/quiz/${session._id}`);
  };

  const onError = (error: AxiosError) => {
    toast.error(extractErrorMessage(error));
    setSelectedTopic(null);
  };

  const { mutate: createQuizMutate } = useMutation({
    mutationFn: QuizAPI.createQuiz,
    mutationKey: ["create-quiz"],
    onSuccess: onCreateQuizSuccess,
    onError,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-topics"],
    queryFn: QuizAPI.getTopics,
  });

  const topicList: Topic[] = data?.topics || [];

  const handleStartQuiz = () => {
    if (!selectedTopic) return;
    createQuizMutate({ topic: selectedTopic._id });
  };

  const renderTopics = (topic: Topic) => (
    <Card
      key={topic._id}
      onClick={() => setSelectedTopic(topic)}
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

  return (
    <PageContent title="Quiz">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="text-gray-500 italic">Loading topics...</div>
          ) : isError ? (
            <div className="text-red-500">Failed to load topics.</div>
          ) : (
            <RenderList
              data={topicList}
              renderFn={(topic) => <div key={topic._id}>{renderTopics(topic)}</div>}
            />
          )}
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
                  onClick={() => setSelectedTopic(null)}
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
