import PageContent from "../components/layout/page-content";
import { getWeaknessColor } from "../utils";

interface WeakArea {
  topic: string;
  weakPercentage: number;
}

interface StudyPlanPageProps {
  weakAreas: WeakArea[];
  onRetakeQuiz: (topic: string) => void;
}

const StudyPlan: React.FC<StudyPlanPageProps> = ({ weakAreas, onRetakeQuiz }) => {


  return (
    <PageContent title="Study Plan">
      <div className="p-6">
        <h2 className="text-xl font-medium mb-4 text-gray-800">Weak Areas Breakdown</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b border-gray-200">Topic</th>
              <th className="text-left py-2 px-4 border-b border-gray-200">Weakness</th>
              <th className="text-left py-2 px-4 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {weakAreas.map((area, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 text-slate-600 border-b border-gray-200">{area.topic}</td>
                <td className="py-2 px-4 text-slate-600 border-b border-gray-200">
                  <div className="mb-2">{area.weakPercentage}%</div>
                  <div className="h-2 w-full rounded-full">
                    <div
                      className={`h-full rounded-full ${getWeaknessColor(area.weakPercentage)}`}
                      style={{ width: `${area.weakPercentage}%` }}
                    />
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <a
                    className="text-indigo-600 hover:text-indigo-900 underline cursor-pointer"
                    onClick={() => onRetakeQuiz(area.topic)}
                  >
                    Take Quiz
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContent>
  );
};

export default StudyPlan;
