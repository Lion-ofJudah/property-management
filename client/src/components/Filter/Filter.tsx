import React from "react";
import Checkbox from "../Checkbox";

interface Props {
  onClick: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  searchParams: { type: string; parking: boolean; furnished: boolean };
  handleClick: (key: "all" | "sell" | "rent") => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchParams: any;
}

export default function Filter({
  onClick,
  handleSubmit,
  searchParams,
  handleChange,
  handleClick,
  setSearchParams,
}: Props) {
  return (
    <div className="border w-full sm:w-2/3 flex flex-col z-20 justify-center items-center sm:rounded-3xl bg-background py-20">
      <div className="relative w-full -top-16">
        <div className="flex px-4 items-center" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          <p className="w-full text-center text-lg font-semibold">Filters</p>
        </div>
        <span className="absolute top-12 border-b border-gray-300 w-full px-4"></span>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col justify-start w-full px-8">
          <p className="font-semibold text-2xl">Type of property</p>
          <p className="text-gray-500">
            Search for properties for sell, or rent or any type.
          </p>
          <div className="flex items-center justify-center mt-6 text-center text-xl">
            <input
              type="checkbox"
              id="all"
              className="hidden"
              checked={searchParams.type === "all"}
              onChange={() => handleClick("all")}
              readOnly
            />
            <span
              id="span-any"
              onClick={() => handleClick("all")}
              className={`border cursor-pointer hover:border-fontColor py-4 rounded-s-2xl w-1/3 ${
                searchParams.type === "all"
                  ? "bg-fontColor text-background border-fontColor"
                  : ""
              }`}
            >
              Any type
            </span>
            <input
              type="checkbox"
              id="sell"
              className="hidden"
              checked={searchParams.type === "sell"}
              onChange={() => handleClick("sell")}
              readOnly
            />
            <span
              id="span-sell"
              onClick={() => handleClick("sell")}
              className={`border cursor-pointer hover:border-fontColor py-4 w-1/3 ${
                searchParams.type === "sell"
                  ? "bg-fontColor text-background border-fontColor"
                  : ""
              }`}
            >
              Sell
            </span>
            <input
              type="checkbox"
              id="rent"
              className="hidden"
              checked={searchParams.type === "rent"}
              onChange={() => handleClick("rent")}
              readOnly
            />
            <span
              id="span-rent"
              onClick={() => handleClick("rent")}
              className={`border cursor-pointer hover:border-fontColor py-4 rounded-e-2xl w-1/3 ${
                searchParams.type === "rent"
                  ? "bg-fontColor text-background border-fontColor"
                  : ""
              }`}
            >
              Rent
            </span>
          </div>
          <span className="border-b border-gray-300 w-full my-10"></span>
        </div>
        <div className="flex flex-col justify-start w-full px-8">
          <p className="font-semibold text-2xl">Amenities</p>
          <p className="text-gray-500">Essentials</p>
          <div className="mt-6 text-center">
            <Checkbox
              id="parking"
              onChange={handleChange}
              checked={searchParams.parking}
            >
              Parking
            </Checkbox>
            <Checkbox
              id="furnished"
              onChange={handleChange}
              checked={searchParams.furnished}
            >
              Furnished
            </Checkbox>
          </div>
        </div>
        <div className="relative w-full top-16 border-t border-gray-300 px-8 pt-4">
          <div className="flex gap-20 justify-around w-full text-center">
            <span
              className="w-1/2 cursor-pointer border py-4 rounded-3xl hover:border-fontColor text-xl"
              onClick={() =>
                setSearchParams({
                  type: "all",
                  parking: false,
                  furnished: false,
                })
              }
            >
              Clear all
            </span>
            <button
              type="submit"
              className="w-1/2 cursor-pointer border py-4 rounded-3xl hover:border-fontColor text-xl"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
