import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import { Toaster } from "react-hot-toast"
import Courses from './components/Courses.jsx'
import Purchases from './components/Purchases.jsx'
import Buy from './components/Buy.jsx'
import AdminSignup from './admin/AdminSignup.jsx'
import CourseCreate from './admin/CourseCreate.jsx'
import Dashboard from './admin/Dashboard.jsx'
import OurCourses from './admin/OurCourses.jsx'
import UpdateCourses from './admin/UpdateCourses.jsx'
import AdminLogin from './admin/AdminLogin.jsx'

function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  const admin = JSON.parse(localStorage.getItem("admin"))
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Other Routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy />} />
        <Route path="/purchases" element={user ? <Purchases /> : <Navigate to={"/login"} />} />

        {/* Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create-course" element={<CourseCreate />} />
        <Route path="/admin/dashboard" element={admin ? <Dashboard /> : <Navigate to={"/admin/login"} />} />
        <Route path="/admin/our-courses" element={<OurCourses />} />
        <Route path="/admin/update-course/:id" element={<UpdateCourses />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;