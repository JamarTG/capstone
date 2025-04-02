import RenderList from "../common/RenderList";

interface SelectDropdownProps {
  options: string[];
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-md text-slate-600">Sort Quiz</legend>
      <select
        defaultValue="Pick an option"
        className="border border-slate-200 p-2 select text-md text-slate-600 focus:outline-none focus:ring-0 focus:border-gray-200 rounded-lg py-2 px-3"
      >
        <option
          disabled
          value="Pick an option"
          className="text-md text-slate-400 bg-transparent"
        >
          Pick an option
        </option>
        <RenderList
          data={options}
          renderFn={(option: string, index: number) => {
            return (
              <option
                style={{ fontWeight: 400 }}
                key={index}
                value={option}
                className="text-md text-slate-600 bg-white hover:bg-slate-100"
              >
                {option}
              </option>
            );
          }}
        />
      </select>
    </fieldset>
  );
};

export default SelectDropdown;
