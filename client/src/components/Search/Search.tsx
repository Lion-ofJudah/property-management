export default function Search() {
  return (
    <form className="flex items-center w-2/5 sm:w-3/5">
      <div className="flex justify-between items-center border border-gray-300 bg-slate-100 py-2.5 pl-6 pr-3 rounded-l-full w-full focus-within:border-secondary focus-within:border-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full bg-transparent outline-none border-hidden"
        />
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
      <button className="py-2.5 pr-4 pl-2.5 cursor-pointer text-background bg-primary rounded-r-full border border-accent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}
