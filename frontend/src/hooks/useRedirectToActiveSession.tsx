import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ActiveQuizSession {
  data: {
    hasActiveSession: boolean;
    sessionId: string;
  };
}

const useRedirectToActiveSession = (activeSession: ActiveQuizSession) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (activeSession?.data?.hasActiveSession && activeSession.data.sessionId) {
      navigate(`/quiz/${activeSession.data.sessionId}`);
    }
  }, [activeSession, navigate]);
};

export default useRedirectToActiveSession;
