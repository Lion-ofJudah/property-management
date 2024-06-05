import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import InputHeader from "../components/InputHeader";
import PasswordInput from "../components/PasswordInput";
import RippleButton from "../components/RippleButton";
import React, { useState } from "react";
import Home from "./Home";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      setLoading(false);
      setError(data.message);
    } else {
      navigate("/");
      setLoading(false);
      setError(null);
    }
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center box-border h-[calc(100vh-80px)] bg-background -mt-20">
      <InputHeader hText="Join Us" pText="Please create a new account" />
      <form
        className="w-full md:max-w-lg mx-auto mt-4 md:mt-8 px-4"
        onSubmit={handleSubmit}
      >
        <InputField
          type="text"
          placeholder="User name"
          onChange={handleChange}
          id="userName"
        />
        <InputField
          type="email"
          placeholder="Email address"
          onChange={handleChange}
          id="email"
        />
        <PasswordInput onChange={handleChange} id="password" />
        <RippleButton
          disabled={loading}
          className="w-full my-3 py-4 px-4 rounded-full bg-primary text-white text-lg mb-4"
        >
          {loading ? "Signing up..." : "Sign up"}
        </RippleButton>
      </form>
      <div className="text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/sign-in" className="underline text-accent cursor-pointer">
          Login
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
