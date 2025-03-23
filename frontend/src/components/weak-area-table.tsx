import { getWeaknessColor } from "../utils";
import { WeakArea } from "../types/study-plan";
import Button from "./ui/button";
import { FaPlay } from "react-icons/fa";

interface WeakAreaTableProps {
  weakAreas: WeakArea[];
  onRetakeQuiz: (topic: string) => void;
}

const WeakAreaTable: React.FC<WeakAreaTableProps> = ({ weakAreas, onRetakeQuiz }) => {
  return (
    <div className="overflow-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Weak Areas</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left text-lg py-3 px-4 border-b border-gray-200">Topic</th>
            <th className="text-left text-lg py-3 px-4 border-b border-gray-200">Weakness</th>
            <th className="text-left text-lg py-3 px-4 border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {weakAreas.map((area, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="text-left px-4 py-3 text-lg text-slate-600 font-semibold">
                {index + 1}. {area.topic}
              </td>
              <td className="py-3 px-4 text-slate-600 border-gray-200 w-1/3">
                <div className="flex items-center">
                  <div className="mr-2">{area.weakPercentage}%</div>
                  <div
                    className={`h-2 rounded-full ${getWeaknessColor(area.weakPercentage)}`}
                    style={{ width: `${area.weakPercentage}%` }}
                  />
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <Button
                  className="w-10 h-10 flex items-center justify-center"
                  size="sm"
                  variant="primary"
                  onClick={() => onRetakeQuiz(area.topic)}
                >
                  <FaPlay size={16} />
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
