import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../public/logo.webp";
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/v1/admin/signup", {
        firstName,
        lastName,
        email,
        password,
      }, {
        withCredentials: true,
        headers: { "Content-type": "application/json" },
      });
      
      console.log("Signup successful:", response.data);
      toast.success(response.data.message);
      navigate("/admin/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.errors || "Signup Failed!!!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black to-blue-950 text-white">
      
      {/* Header */}
      <header className="w-full flex justify-between items-center px-5 py-3 bg-gradient-to-r from-black to-blue-950">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
          <Link to="/" className="text-xl font-bold text-orange-500">CourseHaven</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to={'/admin/login'} className="py-2 px-4 border border-gray-500 rounded-md">Login</Link>
          <Link to={'/signup'} className=" hover:bg-orange-500 border border-gray-500 px-4 py-2 rounded-md text-white">User</Link>
        </div>
      </header>

      {/* Signup Form */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome to <span className="text-orange-500">CourseHaven</span>
          </h2>
          <p className="text-center text-gray-400 mb-6">Just Signup to mess with dashboard!</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstname" className="text-gray-400">Firstname</label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Type your firstname"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastname" className="text-gray-400">Lastname</label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Type your lastname"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="name@email.com"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="text-gray-400">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="********"
                required
              />
            </div>

            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
            )}

            <button type="submit" className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition">
              Signup
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default AdminSignup;

