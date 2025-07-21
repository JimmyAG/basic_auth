import { useNavigate } from "react-router-dom";
import { clearToken } from "../lib/auth/auth-utils";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/login");
  };

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch("http://localhost:3000/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setUser(data);
    };

    fetchMe();
  }, []);

  return (
    <div className="bg-slate-100 w-screen h-screen flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold">
        Welcome{" "}
        <span className="underline cursor-pointer">
          {user?.email ? user.email : "Loading..."}
        </span>{" "}
        to your Dashboard!
      </h2>
      <div className="mt-10">
        <Button className="self-end" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
