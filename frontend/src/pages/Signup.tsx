import SignupForm from "../components/forms/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F2F2F2]">
      <div className="top-22 flex flex-col gap-4 rounded-lg border bg-white p-5 md:w-[400px] md:p-10">
        <div>
          <p className="text-xs antialiased">Welcome! 👋</p>
          <h1 className="font-bold tracking-wide antialiased">
            Create a new account
          </h1>
        </div>

        <SignupForm />
      </div>
    </main>
  );
}
