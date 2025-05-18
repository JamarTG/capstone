import useRedirectToActiveSession from "@/hooks/useRedirectToActiveSession";
import { useMutation, useQuery } from "@tanstack/react-query";
import SectionHeader from "../../components/SectionHeader";
import PageContent from "../../components/layout/Page";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import Loader from "../../components/common/Loader";
import SectionContainer from "./SectionContainer";
import { extractErrorMessage } from "@/utils";
import { IconifyIcons } from "../../icons";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { QuizAPI } from "@/api";

const QuizSelection = () => {
  useAuthRedirect();

  const { data: activeSession, isLoading: isSessionLoading } = useQuery({
    queryKey: ["active-quiz-session"],
    queryFn: QuizAPI.checkActiveSession,
    retry: false,
  });

  const [loadingSection, setLoadingSection] = useState<string | null>(null);

  useRedirectToActiveSession(activeSession);

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
