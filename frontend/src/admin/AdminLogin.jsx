import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Admin Login successful: ", response.data);
      toast.success(response.data.message);
      localStorage.setItem("admin", JSON.stringify(response.data));
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Admin Login failed!!!");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex flex-col items-center text-white p-4">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <Link to="/" className="text-xl font-bold text-orange-500">
              CourseHaven
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/signup"
              className="border border-gray-500 px-4 py-2 text-sm md:text-md rounded-md"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="border border-gray-500 px-4 py-2 text-sm md:text-md rounded-md hover:bg-orange-500"
            >
              User
            </Link>
          </div>
        </header>

        {/* Admin Login Form */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md mt-16">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome to <span className="text-orange-500">CourseHaven</span>
          </h2>
          <p className="text-center text-gray-400 mb-6">Log in to access the admin dashboard!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-400">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="admin@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-400">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  required
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">👁️</span>
              </div>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
