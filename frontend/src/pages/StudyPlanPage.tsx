import { useState } from "react";
import PageContent from "../components/layout/PageLayout";
import WeakAreaTable from "../components/WeakAreaTable";
import UserObjectives from "../components/UserObjectivesC";
import weakAreas from "../data/sample/weakAreas";
import useAuthRedirect from "../hook/useAuthRedirect";
import ConditionalSVG from "../components/ConditionalSVG";

const StudyPlan = () => {
  const [activeTab, setActiveTab] = useState("weakAreas");

  useAuthRedirect();

  return (
    <PageContent
      title="Study Plan ..."
      svg={
        <ConditionalSVG
          path={"home"}
          size={50}
        />
      }
    >
      <div className="mb-4 flex space-x-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("weakAreas")}
          className={`${
            activeTab === "weakAreas" ? "border-slate-600 text-slate-600" : "border-transparent text-slate-600"
          } pb-2 border-b-2 font-semibold px-2 text-md cursor-pointer`}
        >
          Weak Areas
        </button>
        <button
          onClick={() => setActiveTab("userObjectives")}
          className={`${
            activeTab === "userObjectives" ? "border-slate-600 text-slate-600" : "border-transparent text-slate-600"
          } pb-2 border-b-2 font-semibold px-4 text-md cursor-pointer`}
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
