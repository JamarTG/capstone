import { useState } from "react";
import PageContent from "../components/layout/PageLayout";
import WeakAreaTable from "../components/WeakAreaTable";
import UserObjectives from "../components/UserObjectivesC";
import weakAreas from "../data/sample/weakAreas";
import useAuthRedirect from "../hook/useAuthRedirect";

const StudyPlan = () => {
  const [activeTab, setActiveTab] = useState("weakAreas");

  useAuthRedirect();

  return (
    <PageContent
      title="Study Plan ..."
      path = "home"      
    >
      <ul className="flex border-b border-gray-300">
        <li className="-mb-px mr-1">
          <a
            className={`inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold ${
              activeTab === "weakAreas" ? "border-gray-300" : "border-transparent"
            }`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("weakAreas");
            }}
          >
            Weak Areas
          </a>
        </li>
        <li className="mr-1">
          <a
            className={`inline-block py-2 px-4 font-semibold ${
              activeTab === "userObjectives" ? "border-gray-300 border-l border-t border-r rounded-t" : ""
            }`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("userObjectives");
            }}
          >
            User Objectives
          </a>
        </li>
      </ul>
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
