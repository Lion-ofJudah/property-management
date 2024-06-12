import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import Navigation from "../Navigation";
import Search from "../Search";
import User from "../User";
import Notification from "../Notification";
import Message from "../Message";

export default function Header() {
  const { currentUser } = useSelector((state: any) => state.user);
  console.log(currentUser);
  return (
    <header className="flex p-3 shadow-md fixed bg-background justify-between items-center w-screen h-20">
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="hidden sm:flex gap-3 items-center">
        <Link to={"/"}>
          <Navigation>Home</Navigation>
        </Link>
        <Link to={"/about"}>
          <Navigation>About</Navigation>
        </Link>
      </div>
      <Search />
      <div className="hidden sm:flex gap-3 items-center justify-center px-3">
        <Notification></Notification>
        <Message></Message>
      </div>
      {currentUser ? (
        <Link to={"/profile"}>
          <User currentUser={currentUser}></User>
        </Link>
      ) : (
        <Link to={"/sign-in"}>
          <User currentUser={null}></User>
        </Link>
      )}
    </header>
  );
}
