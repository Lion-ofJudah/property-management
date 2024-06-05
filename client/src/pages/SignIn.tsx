import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../features/user/userSlice";
import InputHeader from "../components/InputHeader";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import RippleButton from "../components/RippleButton";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signInStart());
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success === false) {
      dispatch(signInFailure(data.message));
    } else {
      navigate("/");
      dispatch(signInSuccess(data));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center box-border h-[calc(100vh-80px)] bg-background -mt-20">
      <InputHeader hText="Welcome Back" pText="Please login to your account" />
      <form
        className="w-full md:max-w-lg mx-auto mt-4 md:mt-8 px-4"
        onSubmit={handleSubmit}
      >
        <InputField
          type="text"
          placeholder="Email address"
          onChange={handleChange}
          id="email"
        />
        <PasswordInput onChange={handleChange} id="password" />
        <RippleButton
          disabled={loading}
          className="w-full my-3 py-4 px-4 rounded-full bg-primary text-background text-lg mb-4"
        >
          {loading ? "Logging in..." : "Login"}
        </RippleButton>
      </form>
      <div className="text-center text-gray-500">
        Don&apos;t have an account yet?{" "}
        <Link to="/sign-up" className="underline text-accent cursor-pointer">
          Sign up
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
