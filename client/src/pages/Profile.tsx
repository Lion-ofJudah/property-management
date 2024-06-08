import { Link } from "react-router-dom";

interface Props {
  currentUser: any;
}

export default function Profile({ currentUser }: Props) {
  const hasAvatar = currentUser.avatar && currentUser.avatar.trim() !== "";
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
      <Link
        to={"/edit-profile"}
        className="rounded-full border p-2 text-fontColor bg-secondary hover:text-background hover:bg-accent mt-7"
      >
        <p className="font-semibold">Edit profile</p>
      </Link>
      <div className="flex gap-10 mt-20 font-semibold text-sm text-fontColor">
        <p>Owned</p>
        <p>Rented</p>
      </div>
    </div>
  );
}
