import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import startupLogo1 from '../assets/startupLogo1.png';
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";

export default function LoginPage() {
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let {getCurrentUser} = useContext(userDataContext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password,
      }, { withCredentials: true });

      console.log("Login successful:", result.data);
      getCurrentUser();
      navigate("/");
    
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0C0F1F] px-4 py-12">
      <header className="mb-10 text-center max-w-md">
        <div>
          <img
            src={startupLogo1}
            alt="logo"
            className="h-27 mx-auto mb-4 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <h1 className="text-white text-4xl font-extrabold mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-lg">
          Please sign in to your account to continue
        </p>
      </header>

      <div className="max-w-md w-full">
        <form onSubmit={handleLogin} className="bg-[#162439] p-6 rounded-lg shadow-lg space-y-6">
          {/* Email */}
          <div>
            <label className="text-white block mb-1">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="bg-[#0c1521] border border-[#1f2a44] text-white placeholder-gray-400 focus:ring-blue-500 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white block mb-1">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-[#0c1521] border border-[#1f2a44] text-white placeholder-gray-400 focus:ring-blue-500 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Sign In
          </Button>

          {/* Redirect to signup */}
          <p className="text-gray-400 text-sm text-center mt-4">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create a new account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
