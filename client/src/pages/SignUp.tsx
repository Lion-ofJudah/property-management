import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import InputHeader from "../components/InputHeader";
import PasswordInput from "../components/PasswordInput";
import RippleButton from "../components/RippleButton";

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center box-border h-[calc(100vh-80px)] bg-background -mt-20">
      <InputHeader hText="Join Us" pText="Please create a new account" />
      <form className="w-full md:max-w-lg mx-auto mt-4 md:mt-8 px-4">
        <InputField type="text" placeholder="User name" />
        <InputField type="email" placeholder="Email address" />
        <PasswordInput />
        <RippleButton className="w-full my-3 py-4 px-4 rounded-full bg-primary text-white text-lg mb-4">
          Sign up
        </RippleButton>
      </form>
      <div className="text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/sign-in" className="underline text-accent cursor-pointer">
          Login
        </Link>
      </div>
    </div>
  );
}
