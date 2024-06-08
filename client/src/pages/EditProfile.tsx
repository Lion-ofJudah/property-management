interface Props {
  currentUser: any;
}

export default function EditProfile({ currentUser }: Props) {
  const hasAvatar = currentUser.avatar && currentUser.avatar.trim() !== "";
  return (
    <div>
      <div className="bg-background w-2/3 lg:w-1/3 ml-40 mt-6">
        <h2 className="text-3xl font-semibold text-fontColor">Edit profile</h2>
        <p className="text-md text-fontColor mt-2 text-justify">
          Change your profile information over here. Information you add here is
          visible to anyone who can view your profile.
        </p>
      </div>
      <form>
        <div className="bg-background w-2/3 lg:w-1/3 ml-40 mt-6">
          <div className="mt-10">
            <p className="text-xs cursor-pointer">Photo</p>
            <div className="mt-1 flex items-center gap-4">
              {hasAvatar ? (
                <img
                  src={currentUser.avatar}
                  alt="Profile picture"
                  className="rounded-full object-cover size-16 border"
                />
              ) : (
                <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center size-16 rounded-full cursor-pointer">
                  <span className="text-background font-bold text-3xl">
                    {currentUser.userName[0]}
                  </span>
                </div>
              )}
              <a
                href=""
                className="border text-fontColor py-2 px-3 font-medium bg-secondary hover:bg-accent hover:text-background rounded-full"
              >
                Change
              </a>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-xs mb-1 cursor-pointer">User name</p>
            <input
              type="text"
              placeholder="User name"
              id="userName"
              className="border py-2 px-3 w-full rounded-xl focus:border-none focus:outline-secondary"
            />
          </div>
        </div>
        <div className="flex fixed bottom-0 p-5 gap-8 border-t-2 w-full items-center justify-center">
          <a
            href=""
            className="border py-2 px-3 rounded-full font-semibold text-fontColor"
          >
            Reset
          </a>
          <a
            href=""
            className="border py-2 px-3 rounded-full font-semibold text-fontColor"
          >
            Save
          </a>
        </div>
      </form>
    </div>
  );
}
