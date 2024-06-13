import { useLocation } from "react-router-dom";

interface Props {
  path: string;
  currentUser: any;
}

export default function User({ path, currentUser }: Props) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const hasAvatar =
    currentUser && currentUser.avatar && currentUser.avatar.trim() !== "";
  return (
    <div className="p-2 hover:bg-gray-200 rounded-full">
      <div
        className={
          isActive(path) ? "border-4 border-fontColor rounded-full" : "m-1"
        }
      >
        {currentUser ? (
          hasAvatar ? (
            <img
              src={currentUser.avatar}
              alt="img"
              className="cursor-pointer rounded-full object-cover h-9 w-9"
            />
          ) : (
            <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center size-9 rounded-full cursor-pointer">
              <span className="text-background font-bold text-2xl">
                {currentUser.userName[0]}
              </span>
            </div>
          )
        ) : (
          <div className="text-background bg-gray-500 p-1 rounded-full cursor-pointer">
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
