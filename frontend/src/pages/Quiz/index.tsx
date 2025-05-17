import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import PageContent from "../../components/layout/Page";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import SectionHeader from "../../components/SectionHeader";
import { QuizAPI } from "@/api";
import extractErrorMessage from "../../utils/extractErrorMessage";
import Loader from "../../components/common/Loader";
import SectionContainer from "./SectionContainer";
import { IconifyIcons } from "../../icons";

const QuizSelection = () => {
  const navigate = useNavigate();

  useAuthRedirect();

  const { data: activeSession, isLoading: isSessionLoading } = useQuery({
    queryKey: ["active-quiz-session"],
    queryFn: QuizAPI.checkActiveSession,
    retry: false,
  });

  const [loadingSection, setLoadingSection] = useState<string | null>(null);

  useEffect(() => {
    if (activeSession?.data?.hasActiveSession && activeSession.data.sessionId) {
      navigate(`/quiz/${activeSession.data.sessionId}`);
    }
  }, [activeSession, navigate]);

  const onError = (error: AxiosError) => {
    toast.error(extractErrorMessage(error));
  };

  const { mutate: createQuizMutate } = useMutation({
    mutationFn: QuizAPI.createQuiz,
    mutationKey: ["create-quiz"],
    onError,
  });

  if (isSessionLoading) {
    return <Loader text="Checking your quiz progress..." />;
  }

  return (
    <PageContent title="Quiz">
      <SectionHeader
        iconPath={IconifyIcons.cursorDefault}
        title="Topic Selection"
      />
      <SectionContainer
        createQuizMutate={createQuizMutate}
        loadingSection={loadingSection}
        setLoadingSection={setLoadingSection}
      />
    </PageContent>
  );
};

export default QuizSelection;
