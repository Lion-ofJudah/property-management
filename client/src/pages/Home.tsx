import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const [searchParams, setSearchParams] = useState({
    type: "all",
    parking: false,
    furnished: false,
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  console.log(listings);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");

    if (typeFromUrl || parkingFromUrl || furnishedFromUrl) {
      setSearchParams({
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`, {
        method: "GET",
      });
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("type", searchParams.type);
    urlParams.set("parking", searchParams.parking.toString());
    urlParams.set("furnished", searchParams.furnished.toString());

    const searchQuery = urlParams.toString();
    navigate(`/?${searchQuery}`);

    setFilterVisible(!isFilterVisible);
  };

  const handleClick = (key: "all" | "sell" | "rent") => {
    setSearchParams({
      ...searchParams,
      type: key,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    if (id === "parking" || id === "furnished") {
      setSearchParams({
        ...searchParams,
        [id]: checked,
      });
    }
  };

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
            handleSubmit={handleSubmit}
            searchParams={searchParams}
            handleClick={handleClick}
            handleChange={handleChange}
            setSearchParams={setSearchParams}
          />
        </div>
      )}
    </div>
  );
}
