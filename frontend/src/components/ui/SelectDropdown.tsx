import { useState } from "react";
import RenderList from "../common/RenderList";

interface SelectDropdownProps {
  options: string[];
  selected?: string;
  onSelect?: (value: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(selected || "Pick an option");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option: string) => {
    setCurrentValue(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative w-64">
      <label className=" block py-2 text-gray-800">Sort Quiz</label>
      
      <div className="relative">
        <div 
          className="h-10 bg-white flex items-center justify-between border border-gray-200 rounded cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="px-4 text-gray-800">{currentValue}</span>
          <div className="flex">
            {currentValue !== "Pick an option" && (
              <button 
                className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentValue("Pick an option");
                  if (onSelect) onSelect("");
                }}
              >
                <svg 
                  className="w-4 h-4 mx-2 fill-current" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
            <span className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600">
              <svg 
                className="w-4 h-4 mx-2 fill-current" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </span>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 rounded shadow-lg bg-white overflow-hidden border border-gray-200">
            <RenderList
              data={options}
              renderFn={(option: string, index: number) => (
                <div 
                  key={index} 
                  className={`cursor-pointer group border-t border-gray-100 first:border-t-0 ${
                    currentValue === option ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                    {option}
                  </span>
                </div>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDropdown;