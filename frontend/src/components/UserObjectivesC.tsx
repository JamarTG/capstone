import { useState, useEffect } from "react";
import objectivesData from "../data/sample/objectives";
import RenderList from "./common/RenderList";

interface Objective {
  id: number;
  title: string;
  content: string[];
  objectiveNo: number;
}

const UserObjectives = () => {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [selectedObjective, setSelectedObjective] = useState<Objective | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const objectivesPerPage = 10;

  useEffect(() => {
    setObjectives(objectivesData);
  }, []);

  const totalPages = Math.ceil(objectives.length / objectivesPerPage);
  const indexOfLastObjective = currentPage * objectivesPerPage;
  const indexOfFirstObjective = indexOfLastObjective - objectivesPerPage;
  const currentObjectives = objectives.slice(indexOfFirstObjective, indexOfLastObjective);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex h-3/4 gap-10">
      <div className="w-1/3 space-y-4 flex gap-2 justify-between items-start flex-col">
        <div className="flex flex-col justify-between w-full h-full">
          <RenderList
            data={currentObjectives}
            renderFn={(objective) => (
              <p
                key={objective.id}
                onClick={() => setSelectedObjective(objective)}
                className="bg-white cursor-pointer hover:bg-gray-200 text-left border border-gray-100 rounded-xl px-3 py-3 text-md text-slate-600 flex justify-start items-center font-semibold"
              >
                {objective.title}
              </p>
            )}
          />
        </div>

        <nav aria-label="Page navigation">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                className="cursor-pointer px-4 py-2 text-md bg-white font-medium text-gray-700 rounded-l-md hover:bg-gray-300"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            <RenderList
              data={[...Array(totalPages).keys()]}
              renderFn={(number) => (
                <li key={number + 1}>
                  <button
                    className={`cursor-pointer px-4 py-1 text-lg font-medium ${
                      currentPage === number + 1 ? "text-white bg-slate-500" : "text-gray-700 bg-gray-200"
                    } hover:bg-blue-400`}
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </button>
                </li>
              )}
            />
            <li>
              <button
                className="cursor-pointer px-4 py-2 text-md font-medium text-gray-700 bg-white rounded-r-md hover:bg-gray-300"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div
        style={{ height: "85%" }}
        className="bg-white w-2/3 h-full p-4 rounded-lg flex items-center justify-center"
      >
        {selectedObjective ? (
          <div className="flex flex-col h-full w-full">
            <h2 className="p-5 text-xl font-semibold mb-2 flex justify-start  gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="text-slate-600 feather feather-cpu"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="2"
                  ry="2"
                ></rect>
                <rect
                  x="9"
                  y="9"
                  width="6"
                  height="6"
                ></rect>
                <line
                  x1="9"
                  y1="1"
                  x2="9"
                  y2="4"
                ></line>
                <line
                  x1="15"
                  y1="1"
                  x2="15"
                  y2="4"
                ></line>
                <line
                  x1="9"
                  y1="20"
                  x2="9"
                  y2="23"
                ></line>
                <line
                  x1="15"
                  y1="20"
                  x2="15"
                  y2="23"
                ></line>
                <line
                  x1="20"
                  y1="9"
                  x2="23"
                  y2="9"
                ></line>
                <line
                  x1="20"
                  y1="14"
                  x2="23"
                  y2="14"
                ></line>
                <line
                  x1="1"
                  y1="9"
                  x2="4"
                  y2="9"
                ></line>
                <line
                  x1="1"
                  y1="14"
                  x2="4"
                  y2="14"
                ></line>
              </svg>

              <p className="text-4xl font-bold text-slate-600">{selectedObjective.title}</p>
            </h2>
            <ul className="pl-5 space-y-2 h-1/2">
              <RenderList
                data={selectedObjective.content}
                renderFn={(point, index) => (
                  <p
                    key={index}
                    className="py-2 px-1 text-md text-slate-600 flex items-center"
                  >
                    {point}
                  </p>
                )}
              />
              <ul />
            </ul>
          </div>
        ) : (
          <p className="text-center text-lg text-slate-500">Select an objective to see the details</p>
        )}
      </div>
    </div>
  );
};

export default UserObjectives;
