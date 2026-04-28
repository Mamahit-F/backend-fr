import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8081/api/login", {
        username,
        password,
      });
      alert("Login berhasil 🔥");
    } catch (err) {
      alert("Login gagal ❌");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 to-blue-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
        <p className="text-white/80 text-center max-w-sm">
          Manage your assignments, track progress, and boost productivity with AI 🚀
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:scale-105 transition">
              Login
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-purple-600 font-semibold">
              Register
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}