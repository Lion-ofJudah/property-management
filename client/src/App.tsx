import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import About from "./pages/About";
import EditProfile from "./pages/EditProfile";
import ProtectRoute from "./components/ProtectRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditLIsting";
import ShowListing from "./pages/ShowListing";

export default function App() {
  const { currentUser } = useSelector((select: any) => select.user);
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/listings/:listingId" element={<ShowListing />} />
          <Route element={<ProtectRoute />}>
            <Route
              path="/profile"
              element={
                <Profile currentUser={currentUser ? currentUser : null} />
              }
            />
            <Route
              path="/edit-profile"
              element={
                <EditProfile currentUser={currentUser ? currentUser : null} />
              }
            />
            <Route
              path="/create-listing"
              element={<CreateListing currentUser={currentUser} />}
            />
            <Route
              path="/update-listing/:listingId"
              element={<EditListing currentUser={currentUser} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
