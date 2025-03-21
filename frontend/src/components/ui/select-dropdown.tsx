interface SelectDropdownProps {
  options: string[];
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options }) => {
  return (
    <div className="flex flex-col">
      <label className="">SortBy</label>

      <select className="p-2 max-w-xs border border-slate-200 rounded  focus:outline-none">
        {options.map((option: string, index: number) => {
          return (
            <option
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
