import { useState } from "react";
import RenderList from "../../components/common/RenderList";

interface ScoreFilterProps {
  onFilterChange: (ranges: ScoreRange[]) => void;
}

type ScoreRange = "0-49" | "50-79" | "80-100";

export const ScoreFilter = ({ onFilterChange }: ScoreFilterProps) => {
  const [selectedRanges, setSelectedRanges] = useState<ScoreRange[]>([]);

  const handleRangeToggle = (range: ScoreRange) => {
    const newRanges = selectedRanges.includes(range) ? selectedRanges.filter((r) => r !== range) : [...selectedRanges, range];

    setSelectedRanges(newRanges);
    onFilterChange(newRanges);
  };

  const renderRanges = (range: { label: string; value: ScoreRange }) => (
    <label
      key={range.value}
      className="flex items-center gap-2 cursor-pointer"
    >
      <input
        type="checkbox"
        checked={selectedRanges.includes(range.value)}
        onChange={() => handleRangeToggle(range.value)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span>{range.label}</span>
    </label>
  );

  const ranges: { label: string; value: ScoreRange }[] = [
    { label: "0-49%", value: "0-49" },
    { label: "50-79%", value: "50-79" },
    { label: "80-100%", value: "80-100" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        <RenderList
          data={ranges}
          renderFn={renderRanges}
        />
      </div>
    </div>
  );
};
