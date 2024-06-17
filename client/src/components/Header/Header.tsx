import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import Navigation from "../Navigation";
import Search from "../Search";
import User from "../User";
import Notification from "../Notification";
import Message from "../Message";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state: any) => state.user);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="flex p-3 shadow-md fixed bg-background justify-between items-center w-screen h-20">
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="hidden sm:flex gap-3 items-center">
        <Link to={"/"}>
          <Navigation path="/">Home</Navigation>
        </Link>
        <Link to={"/about"}>
          <Navigation path="/about">About</Navigation>
        </Link>
      </div>
      <Search
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        onClick={() => {
          setSearchTerm("");
        }}
        onSubmit={handleSubmit}
      />
      <div className="hidden sm:flex gap-3 items-center justify-center px-3">
        <Notification></Notification>
        <Message></Message>
      </div>
      {currentUser ? (
        <Link to={"/profile"}>
          <User path="/profile" currentUser={currentUser}></User>
        </Link>
      ) : (
        <Link to={"/sign-in"}>
          <User path="/sign-in" currentUser={null}></User>
        </Link>
      )}
    </header>
  );
}
