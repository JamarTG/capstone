import { getWeaknessColor } from "../utils";
import { WeakArea } from "../types/study-plan";
import Button from "./ui/button";

interface WeakAreaTableProps {
  weakAreas: WeakArea[];
  onRetakeQuiz: (topic: string) => void;
}

const WeakAreaTable: React.FC<WeakAreaTableProps> = ({ weakAreas, onRetakeQuiz }) => {
  return (
    <div className="overflow-auto">
      <table className="w-full border border-gray-200 rounded-lg h-full">
        <thead>
          <tr>
            <th className="text-left text-lg py-2 px-4 border-b border-gray-200">Topic</th>
            <th className="text-left text-lg py-2 px-4 border-b border-gray-200">Weakness</th>
            <th className="text-left text-lg  py-2 px-4 border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {weakAreas.map((area, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100"
            >
              <td className="text-left px-3 text-lg text-slate-600 font-semibold">
                {index + 1}. {area.topic}
              </td>
              <td className="py-6 px-4 text-slate-600 border-gray-200 w-1/3">
                <div className="flex justify-start gap-2 items-center h-2 w-full rounded-full">
                  <div className="mb-2">{area.weakPercentage}%</div>
                  <div
                    className={`h-full rounded-full ${getWeaknessColor(area.weakPercentage)}`}
                    style={{ width: `${area.weakPercentage}%` }}
                  />
                </div>
              </td>
              <td className="py-1 px-4 ">
                <Button
                  variant="secondary"
                  onClick={() => onRetakeQuiz(area.topic)}
                >
                  Take Quiz
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeakAreaTable;

