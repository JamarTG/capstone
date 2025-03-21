import PageContent from "../components/layout/page-content";
import Button from "../components/ui/button";

interface WeakArea {
  topic: string;
  weakPercentage: number;
}

interface StudyPlanPageProps {
  weakAreas: WeakArea[];
  onRetakeQuiz: (topic: string) => void;
}

const StudyPlan: React.FC<StudyPlanPageProps> = ({ weakAreas, onRetakeQuiz }) => {
  // Function to determine color based on weakness percentage
  const getWeaknessColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <PageContent title="Study Plan">
      <div className="p-6">
        <h2 className="text-xl font-medium mb-4 text-gray-800">Weak Areas Breakdown</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {weakAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-md font-bold text-gray-800">{area.topic}</h3>
              <p className="text-sm text-gray-600">Weakness: {area.weakPercentage}%</p>

              <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${getWeaknessColor(area.weakPercentage)}`}
                  style={{ width: `${area.weakPercentage}%` }}
                />
              </div>

              <Button
                variant="primary"
                onClick={() => onRetakeQuiz(area.topic)}
                className="mt-4 w-full"
              >
                Retake Quiz
              </Button>
            </div>
          ))}
        </div>
      </div>
    </PageContent>
  );
};

export default StudyPlan;
