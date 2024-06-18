import { useState } from "react";
import Filter from "../components/Filter";

export default function Home() {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const handleFilterClick = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div>
      <div
        className="cursor-pointer fixed right-0 mr-10 mt-2 hover:bg-gray-200 hover:rounded-full p-2"
        onClick={handleFilterClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 hover:text-accent"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </div>
      {isFilterVisible && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/30 flex items-center justify-center">
          <Filter
            onClick={() => {
              setFilterVisible(!isFilterVisible);
            }}
          />
        </div>
      )}
    </div>
  );
}
