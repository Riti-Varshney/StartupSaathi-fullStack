import React, { use, useState } from "react";
import { Rocket, Users, X, Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import startupLogo1 from '../assets/startupLogo1.png';
import { useContext } from "react";
import { authDataContext } from "../context/authContext.jsx";
import { userDataContext } from "../context/userContext.jsx";
import axios from "axios";
export default function RegistrationUI() {
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let [selectedRole, setSelectedRole] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let { getCurrentUser } = useContext(userDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${serverUrl}/api/auth/registration`, {
        name,
        email,
        password,
        role: selectedRole,
      }, { withCredentials: true });
      getCurrentUser();
      navigate("/");
      console.log(result.data)
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.message || error.message));
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-[#0C0F1F] text-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div><img src={startupLogo1} alt="logo" className="h-27 mx-auto mb-4  cursor-pointer" onClick={() => { navigate("/") }} /></div>
          <h1 className="text-4xl font-bold mb-2">Create Your Account</h1>
          <p className="text-gray-400 text-lg">
            Join <span className="text-blue-500 font-semibold">StartUp Saathi</span> - Connect, Learn, Grow
          </p>
        </div>

        {/* Role Selection */}
        <form onSubmit={handleSignup}>
          <div className="mb-8 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Choose Your Role
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div
                role="button"
                tabIndex={0}
                className={`p-6 rounded cursor-pointer select-none ${selectedRole === "founder" ? "bg-blue-600/30" : "bg-gray-700"
                  }`}
                onClick={() => setSelectedRole("founder")} value={selectedRole}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedRole("founder");
                }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Rocket className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Founder</h3>
                  <p className="text-sm text-gray-400">Looking for mentorship</p>
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                className={`p-6 rounded cursor-pointer select-none ${selectedRole === "mentor" ? "bg-blue-600/30" : "bg-gray-700"
                  }`}
                onClick={() => setSelectedRole("mentor")} value={selectedRole}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedRole("mentor");
                }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Mentor</h3>
                  <p className="text-sm text-gray-400">Ready to guide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="mb-8 bg-gray-800 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => { setName(e.target.value) }} value={name}
              />
            </div>
           
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => { setEmail(e.target.value) }} value={email}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => { setPassword(e.target.value) }} value={password}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword}
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedRole}
            className="w-full py-4 text-lg font-semibold bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center mt-4 text-gray-400">
          <p className="text-sm">
            Already have an account?
            <span className="text-blue-500 ml-1 hover:underline cursor-pointer " onClick={() => navigate("/login")}>
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
