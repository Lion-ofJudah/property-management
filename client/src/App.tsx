import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
<<<<<<< HEAD
import Header from "./components/Header";
import About from "./pages/About";
=======
>>>>>>> d8d9d083d45f476d5b1240a3072056f03bcf0c88

export default function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
=======
      <Routes>
        <Route path="/" element={<Home />} />
>>>>>>> d8d9d083d45f476d5b1240a3072056f03bcf0c88
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
