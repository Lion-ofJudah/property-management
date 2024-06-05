import Logo from "../Logo";
import Navigation from "../Navigation";
import Search from "../Search";
import { Link } from "react-router-dom";
import User from "../User";
import Notification from "../Notification";
import Message from "../Message";

export default function Header() {
  return (
    <header className="flex p-3 shadow-md fixed bg-background justify-between items-center w-screen h-20">
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="flex gap-3 items-center">
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
      <Link to={"/sign-in"}>
        <User></User>
      </Link>
    </header>
  );
}
