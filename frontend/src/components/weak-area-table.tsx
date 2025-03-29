import { WeakArea } from "../types/study-plan";
import { MdOutlineQuiz } from "react-icons/md";
import RenderList from "./common/render-list";
import toast from "react-hot-toast";

interface WeakAreaTableProps {
  weakAreas: WeakArea[];
  onRetakeQuiz: (topic: string) => void;
}

const WeakAreaTable: React.FC<WeakAreaTableProps> = ({ weakAreas }) => {
  const renderWeakAreas = (area: WeakArea, index: number) => (
    <tr
      key={index}
      className="hover:bg-gray-100"
    >
      <td className="text-left px-3 text-md text-slate-600 font-semibold">{area.topic}</td>
      <td className="py-6 px-4 text-slate-600 border-gray-200 w-1/3">
        <div className="flex justify-start gap-2 items-center h-2 w-full rounded-full">
          {/* <div className={`mb-2 ${getTextWeaknessColor(area.weakPercentage)}`}>{area.weakPercentage}%</div> */}
          <div>{area.weakPercentage}%</div>
          <div
            className={`h-2 rounded-full bg-slate-600 `}
            // ${getBgWeaknessColor(area.weakPercentage)} - considering color coding
            style={{ width: `${area.weakPercentage}%` }}
          ></div>
        </div>
      </td>
      <td className="py-1 px-4"></td>
    </tr>
  );

  const renderWeakAreasTableRows = () => {
    return (
      <tr>
        <th className="text-left text-2xl text-slate-600 py-2 px-3">Syllabus Sections</th>
        <th className="text-left text-2xl text-slate-600 py-2 px-3">Weakness</th>
        <th className="text-left  py-2 px-4"></th>
      </tr>
    );
  };

  return (
    <div className="overflow-auto">
      <table className="w-full rounded-lg h-full">
        <thead>{renderWeakAreasTableRows()}</thead>
        <tbody>
          <RenderList
            data={weakAreas}
            renderFn={renderWeakAreas}
          />
        </tbody>
      </table>
    </div>
  );
};

export default WeakAreaTable;
