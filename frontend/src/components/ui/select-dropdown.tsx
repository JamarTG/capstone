interface SelectDropdownProps {
  options: string[];
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options }) => {
  return (
    <div className="flex flex-col">
      <label className="text-slate-600 text-lg">Sort on:</label>
      <select className="p-2 max-w-xs border border-slate-200 rounded  focus:outline-none text-lg text-slate-600 font-medium">
        {options.map((option: string, index: number) => {
          return (
            <option
              className="text-lg text-slate-600 font-medium"
              key={index}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectDropdown;
