import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8081/api/register", {
        username,
        password,
      });
      alert("Register berhasil 🎉");
    } catch (err) {
      alert("Register gagal ❌");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Join Us 🚀</h1>
        <p className="text-white/80 text-center max-w-sm">
          Start managing your assignments smarter with AI-powered tools.
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:scale-105 transition">
              Register
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}