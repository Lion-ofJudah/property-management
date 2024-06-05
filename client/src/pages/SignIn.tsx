import { Link } from "react-router-dom";
import InputHeader from "../components/InputHeader";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import RippleButton from "../components/RippleButton";

export default function SignIn() {
  const handleChange = (event: any) => {};

  return (
    <div className="flex flex-col justify-center items-center box-border h-[calc(100vh-80px)] bg-background -mt-20">
      <InputHeader hText="Welcome Back" pText="Please login to your account" />
      <form className="w-full md:max-w-lg mx-auto mt-4 md:mt-8 px-4">
        <InputField
          type="text"
          placeholder="Email address"
          onChange={handleChange}
          id="email"
        />
        <PasswordInput onChange={handleChange} id="password" />
        <RippleButton className="w-full my-3 py-4 px-4 rounded-full bg-primary text-background text-lg mb-4">
          Login
        </RippleButton>
      </form>
      <div className="text-center text-gray-500">
        Don't have an account yet?{" "}
        <Link to="/sign-up" className="underline text-accent cursor-pointer">
          Sign up
        </Link>
      </div>
    </div>
  );
}
