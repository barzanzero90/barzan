import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const { user, login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (email.trim() != "" && password.trim() != "") {
        await login({ email, password });
      } else {
		alert("Please fill in all fields");
	  }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-4 w-[350px] p-2 border border-[#31236F] rounded-md">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl font-bold">Login</h2>
          {error && <p className="text-red-600">{error}</p>}
        </div>

        <form className="flex flex-col justify-center items-center gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
			className="bg-transparent w-[300px] p-2 border border-[#31236F] rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
			className="bg-transparent w-[300px] p-2 border border-[#31236F] rounded-md"
          />

          <button
            onClick={handleLogin}
            className="bg-[#5E43D5] hover:bg-[#5E43D5]/75 rounded-md w-[300px] p-2"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
