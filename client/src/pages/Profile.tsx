import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  currentUser: any;
}

export default function Profile({ currentUser }: Props) {
  const [activeFilter, setActiveFilter] = useState<"owned" | "rented">(
    "rented"
  );
  const [listingError, setListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const hasAvatar = currentUser.avatar && currentUser.avatar.trim() !== "";

  const handleFilterChange = (filter: "owned" | "rented") => {
    setActiveFilter(filter);
  };

  const handleShowListing = async () => {
    console.log("id", currentUser._id);
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        setListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setListingError(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((pervious) =>
        pervious.filter((listing: any) => listing._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-5">
      <div>
        {hasAvatar ? (
          <img
            src={currentUser.avatar}
            alt="Profile picture"
            className="cursor-pointer rounded-full object-cover size-28 border"
          />
        ) : (
          <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center size-28 rounded-full cursor-pointer">
            <span className="text-background font-bold text-6xl">
              {currentUser.userName[0]}
            </span>
          </div>
        )}
      </div>

      <p className="text-3xl text-fontColor font-bold mt-3">
        {currentUser.userName}
      </p>
      <div className="flex gap-3">
        <Link
          to={"/create-listing"}
          className="rounded-full border p-2 text-fontColor bg-secondary hover:text-background hover:bg-accent mt-7"
        >
          <span className="font-semibold">Add property</span>
        </Link>
        <Link
          to={"/edit-profile"}
          className="rounded-full border p-2 text-fontColor bg-secondary hover:text-background hover:bg-accent mt-7"
        >
          <span className="font-semibold">Edit profile</span>
        </Link>
      </div>
      <div className="flex gap-10 mt-24 font-semibold text-md text-fontColor">
        <span
          onClick={() => {
            handleFilterChange("owned");
            handleShowListing();
          }}
          className={`${
            activeFilter === "owned" ? "" : "hover:bg-gray-200 rounded-lg"
          } cursor-pointer p-2 relative`}
        >
          Owned
          {activeFilter === "owned" && (
            <span className="absolute left-0 right-0 bottom-[-4px] h-[4px] bg-fontColor rounded-lg"></span>
          )}
        </span>
        <span
          onClick={() => handleFilterChange("rented")}
          className={`${
            activeFilter === "rented" ? "" : " hover:bg-gray-200 rounded-lg"
          } cursor-pointer p-2 relative`}
        >
          Rented
          {activeFilter === "rented" && (
            <span className="absolute left-0 right-0 bottom-[-4px] h-[4px] bg-fontColor rounded-lg"></span>
          )}
        </span>
      </div>
      <div className="mt-8 flex flex-col w-3/5">
        {userListings && userListings.length > 0 ? (
          <div>
            <p className="font-bold text-xl text-center mb-4">
              {userListings.length > 1 ? "Your Properties" : "Your Property"}
            </p>
            {userListings.map((listing: any) => {
              return (
                <div
                  key={listing._id}
                  className="border border-gray-300 p-4 rounded-2xl hover:shadow-md cursor-pointer flex"
                >
                  <Link
                    to={`/listings/${listing._id}`}
                    className="flex items-center gap-6 w-5/6"
                  >
                    <img
                      src={listing.imageUrls[0]}
                      alt="property"
                      className="size-16 object-cover rounded-lg"
                    />
                    <p className="font-bold text-lg truncate">
                      {listing.title}
                    </p>
                  </Link>
                  <div className="flex gap-6 justify-center items-center w-1/6 font-light border-l">
                    <Link to={`/update-listing/${listing._id}`}>
                      <span>
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </span>
                    </Link>
                    <span
                      onClick={() => {
                        handleDelete(listing._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 hover:text-red-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-28 text-center">
            <p>You don't own properties in this account.</p>
          </div>
        )}
      </div>
    </div>
  );
}
