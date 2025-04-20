import PageLayout from "../../components/layout/Page";
import SectionHeader from "../../components/SectionHeader";
import { FeedbackEntry } from "../../types/feedback";
import FeedbackList from "./FeedbackList";
import { mdiClipboardOutline } from "@mdi/js";

const dummyFeedbacks: FeedbackEntry[] = [
  {
    section: "Section 1",
    feedback: "You struggled with identifying the correct variable type.",
    created_at: "2025-04-17T14:30:00Z",
  },
  {
    section: "Section 2",
    feedback: "You missed the use of conditional logic in question 3.",
    created_at: "2025-04-12T10:15:00Z",
  },
  {
    section: "Section 3",
    feedback: "Loop structure was used incorrectly.",
    created_at: "2025-04-05T08:45:00Z",
  },
];

const QuizFeedbackPage = () => {
  return (
    <PageLayout title="Feedback">
      <div className="flex flex-col gap-6 p-4 max-w-3xl xl:items-start lg:items-start xs:items-center">
        <div className="flex flex-col gap-1 w-full">
          <SectionHeader iconPath={mdiClipboardOutline} title="Quiz Feedback" />
        </div>
        <div className="w-full">
          <FeedbackList feedbacks={dummyFeedbacks} />
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizFeedbackPage;
