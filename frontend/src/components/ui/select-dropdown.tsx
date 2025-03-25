import RenderList from "../common/render-list";

interface SelectDropdownProps {
  options: string[];
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options }) => {
  return (
    <div className="flex flex-col">
      <label className="text-slate-600 text-lg">Sort on:</label>
      <select className="relative flex flex-col my-6 p-3 pr-2 bg-white border-2 border-b-4 border-slate-200 rounded-lg w-96 transform transition-transform perspective-1000 focus:outline-none">
        <RenderList
          data={options}
          renderFn={(option: string, index: number) => {
            return (
              <option
                className="text-lg text-slate-600 font-medium"
                key={index}
                value={option}
              >
                {option}
              </option>
            );
          }}
        />
      </select>
    </div>
  );
};

export default SelectDropdown;
