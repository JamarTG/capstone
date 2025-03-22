import { useState, useEffect } from "react";
import objectivesData from "../data/sample/objectives";

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
    <div className="h p-4 flex h-full">
      <div className="w-1/3 p-4 space-y-4 flex justify-between items-start flex-col">
        <div>
          {currentObjectives.map((objective) => (
            <div
              key={objective.id}
              className="bg-white rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedObjective(objective)}
            >
              <p className="text-left px-3 py-5 text-lg text-slate-600 font-semibold">
                {objective.objectiveNo.toFixed(1)}. {objective.title}
              </p>
            </div>
          ))}
        </div>

        <nav aria-label="Page navigation">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number + 1}>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === number + 1
                      ? "text-blue-600 border border-blue-300 bg-blue-50"
                      : "text-gray-500 bg-white border border-gray-300"
                  } hover:bg-gray-100 hover:text-gray-700`}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 9l4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="w-2/3 h-full p-4 rounded-lg flex items-center justify-center">
        {selectedObjective ? (
          <div className="flex flex-col">
            <h2 className="p-5 text-xl font-semibold mb-2 flex justify-start  gap-2 items-center">
              <svg
                className="fill-slate-800 w-8 h-full "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 0C100.3 0 0 35.8 0 80V432c0 44.2 100.3 80 224 80s224-35.8 224-80V80c0-44.2-100.3-80-224-80zM224 48c97.2 0 176 28.7 176 64s-78.8 64-176 64S48 148.3 48 112s78.8-64 176-64zM48 192c0-1.1 .2-2.1 .6-3.2C91.8 207.1 154.9 224 224 224s132.2-16.9 175.4-35.2c.4 1 .6 2.1 .6 3.2V272c0 35.3-78.8 64-176 64S48 307.3 48 272V192zM48 352c0-1.1 .2-2.1 .6-3.2C91.8 367.1 154.9 384 224 384s132.2-16.9 175.4-35.2c.4 1 .6 2.1 .6 3.2V432c0 35.3-78.8 64-176 64S48 467.3 48 432V352z" />
              </svg>

              <p className="text-2xl text-slate-600">{selectedObjective.title}</p>
            </h2>
            <ul className="pl-5 space-y-2">
              {selectedObjective.content.map((point, index) => (
                <p
                  key={index}
                  className="py-2 px-1 text-lg text-slate-600 border-b border-gray-200 flex items-center"
                >
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.26L12 18.897l-7.417 4.633L6 15.27 0 9.423l8.332-1.268z" />
                  </svg>
                  {point}
                </p>
              ))}

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
