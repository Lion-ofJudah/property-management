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
          <Route element={<ProtectRoute />}>
            <Route
              path="/profile"
              element={<Profile currentUser={currentUser.user} />}
            />
            <Route
              path="/edit-profile"
              element={<EditProfile currentUser={currentUser.user} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
