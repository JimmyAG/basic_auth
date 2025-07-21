import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F2F2F2]">
      <div className="top-22 flex flex-col gap-4 rounded-lg border bg-white p-5 md:w-[400px] md:p-10">
        <div>
          <p className="text-xs antialiased">Welcome back! 👋</p>
          <h1 className="font-bold tracking-wide antialiased">
            Login to your account
          </h1>
        </div>

        <LoginForm />

        <p className="self-end text-xs antialiased">
          Don't have an account yet?{" "}
          <Link
            to="/signup"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
