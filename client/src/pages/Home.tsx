import { useCallback, useEffect, useRef, useState } from "react";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";

export default function Home() {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [searchParams, setSearchParams] = useState({
    type: "all",
    parking: false,
    furnished: false,
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalListings, setTotalListings] = useState(0);

  const navigate = useNavigate();
  const observer = useRef();

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
      if (startIndex === 0) {
        setListings(data);
      } else {
        setListings((prevListings) => [...prevListings, ...data]);
      }
      setTotalListings(listings.length);
      setLoading(false);
    };

    fetchListings();
  }, [location.search, startIndex]);

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

  const lastListingElement = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && listings.length < totalListings) {
          setStartIndex((prevStartIndex) => prevStartIndex + 20);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, listings, totalListings]
  );

  return (
    <div>
      <div
        className="bg-background border-y fixed top-20 w-full z-10 flex items-center justify-end p-1 shadow-md"
        onClick={handleFilterClick}
      >
        <div className="cursor-pointer hover:bg-gray-200 hover:rounded-full hover:text-accent p-2">
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
      </div>
      {isFilterVisible && (
        <div className="fixed z-20 top-0 left-0 w-full h-screen bg-black/30 flex items-center justify-center">
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
      {loading && (
        <div className="h-[calc(100vh-90px)] flex justify-center items-center gap-6 px-20">
          <Loading />
        </div>
      )}
      {loading === false && listings.length === 0 && (
        <div className="h-[calc(100vh-90px)] flex justify-center items-center gap-6 px-20">
          <span className="w-1/4 border-b"></span>
          <p className="text-xl">Oops!!! No properties found!</p>
          <span className="w-1/4 border-b"></span>
        </div>
      )}
      {loading === false && listings && listings.length > 0 && (
        <div className="pt-20 px-10 z-0 flex flex-wrap gap-4 lg:gap-6 w-full mx-auto items-center">
          {listings.map((listing: any) => {
            return (
              <Card
                key={listing._id}
                images={listing.imageUrls}
                title={listing.title}
                description={listing.description}
                price={
                  listing.type === "sell"
                    ? listing.regularPrice
                    : listing.regularPrice
                }
                onClick={() => {
                  navigate(`/listings/${listing._id}`);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
