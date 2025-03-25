import { useState } from "react";
import PageContent from "../components/layout/page-content";
import WeakAreaTable from "../components/weak-area-table";
import UserObjectives from "../components/user-objectives";
import weakAreas from "../data/sample/weakAreas";
import useAuthRedirect from "../hook/useAuthRedirect";

const StudyPlan = () => {
  const [activeTab, setActiveTab] = useState("weakAreas");

  useAuthRedirect();
  
  return (
    <PageContent title="Study Plan">
      <div className="mb-4 flex space-x-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("weakAreas")}
          className={`${
            activeTab === "weakAreas" ? "border-blue-500 text-blue-600" : "border-transparent text-slate-600"
          } pb-2 border-b-2 font-semibold px-4 text-lg`}
        >
          Weak Areas
        </button>
        <button
          onClick={() => setActiveTab("userObjectives")}
          className={`${
            activeTab === "userObjectives" ? "border-blue-500 text-blue-600" : "border-transparent text-slate-600"
          } pb-2 border-b-2 font-semibold px-4 text-lg`}
        >
          User Objectives
        </button>
      </div>

      <div className="relative h-full overflow-auto">
        {activeTab === "weakAreas" && (
          <WeakAreaTable
            weakAreas={weakAreas}
            onRetakeQuiz={() => {
              console.log("retake quiz");
            }}
          />
        )}
        {activeTab === "userObjectives" && <UserObjectives />}
      </div>
    </PageContent>
  );
};

export default StudyPlan;
