// import React, { useEffect, useState } from 'react'
// import logo from '../../public/logo.webp'
// import { Link, useNavigate } from 'react-router-dom'
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import axios from "axios";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css"
// import Slider from "react-slick"
// import toast from 'react-hot-toast';
// import { BACKEND_URL } from "../utils/utils";

// function Home() {

//     const [courses, setCourses] = useState([])
//     const [isLoggedIn, setIsLoggedIn] = useState(false)
//     const navigate = useNavigate();


//     useEffect(() => {
//         const token = localStorage.getItem("user")
//         console.log(token)
//         if (token) {
//             setIsLoggedIn(true)
//         } else { setIsLoggedIn(false) }
//     }, [])



//     // logout
//     const handleLogout = async () => {
//         try {
//             const response = await axios.get(`${BACKEND_URL}/user/logout`, {
//                 withCredentials: true,
//             });
//             toast.success(response.data.message);
//             localStorage.removeItem("user");
//             setIsLoggedIn(false);
//         } catch (error) {
//             console.log("Error in logging out ", error);
//             toast.error(error.response.data.errors || "Error in logging out");
//         }
//     };

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get(`${BACKEND_URL}/course/courses`, {
//                     withCredentials: true,
//                 })
//                 console.log(response.data.courses)
//                 setCourses(response.data.courses)
//             } catch (error) {
//                 console.log("Error in fetchCourses", error)
//             }
//         };
//         fetchCourses();
//     }, [])

//     var settings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         initialSlide: 0,
//         autoplay: true,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 2,
//                     infinite: true,
//                     dots: true
//                 }
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 2,
//                     initialSlide: 2
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1
//                 }
//             }
//         ]
//     };

//     const buyCourse = ()=>{
//         const token = JSON.parse(localStorage.getItem("user"))
//         if(!token){
//             navigate("/login")
//         }else{
//             navigate("/courses")
//         }
//     }

//     return (
//         <div className='bg-gradient-to-r from-black to-blue-950 h-full px-12 py-12'>
//             <div className='text-white container mx-auto'>
//                 {/* Header section */}
//                 <header className='flex items-center justify-between '>
//                     <div className='flex items-center space-x-2'>
//                         <img src={logo} alt="left" className='h-10 w-10 rounded-full' />
//                         <h1 className='text-2xl text-orange-500 font-bold'>CourseHeaven</h1>
//                     </div>
//                     <div className='space-x-4'>
//                         {isLoggedIn ? (
//                             <button onClick={handleLogout} className='bg-transparent text-white py-2 px-4 border border-white rounded'>Logout</button>
//                         ) : (<> 
//                             <Link to={'/login'} className='bg-transparent text-white py-2 px-4 border border-white rounded'>Login</Link>
//                             <Link to={'/signup'} className='bg-transparent text-white py-2 px-4 border border-white rounded'>Signup</Link>

//                         </>)}
//                     </div>
//                 </header>

//                 {/* Main section */}
//                 <section className='text-center py-20'>
//                     <h1 className='text-4xl font-semibold text-orange-500'>CourseHeaven</h1>
//                     <br />
//                     <p className='text-gray-500'>Sharpen your skills with courses crafted by experts.</p>
//                     <div className='space-x-4 mt-8'>
//                         <Link to={"/courses"} className='bg-green-500 py-3 px-6 text-white rounded font-semibold hover:bg-white duration-300 hover:text-black'>Explore courses</Link>
//                         <Link to={"https://www.youtube.com/@ashish-itguru/videos"} className='bg-white py-3 px-6 text-black rounded font-semibold hover:bg-green-500 duration-300 hover:text-white' >Course videos</Link>
//                     </div>
//                 </section>
//                 <section className='p-10'>
//                     <Slider className='' {...settings}>
//                         {courses.map((course) => (
//                             <div key={course._id} className='p-4'>
//                                 <div className='relative flex-shrink-0 w-full transition-transform duration-300 transform hover:scale-105 '>
//                                     <div className='bg-gray-900 rounded-lg overflow-hidden '>
//                                         <img className='h-32 w-full object-contain'
//                                             src={course?.image?.url} alt="" />
//                                         <div className='p-6 text-center'>
//                                             <h2 className='text-xl font-bold text-white'>{course.title}</h2>
//                                             <button onClick={()=>buyCourse(course)} className='mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300'>Enroll Now</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 </section>
//                 <hr />
//                 {/* Footer */}
//                 <footer className='my-8'>
//                     <div className='grid grid-cols-1 md:grid-cols-3'>
//                         <div className='flex flex-col items-center md:items-start'>
//                             <div className='flex items-center space-x-2'>
//                                 <img src={logo} alt="left" className='h-10 w-10 rounded-full' />
//                                 <h1 className='text-2xl text-orange-500 font-bold'>CourseHeaven</h1>
//                             </div>
//                             <div className='mt-3 ml-2 md:ml-8'>
//                                 <p className='mb-2'>Follow us</p>
//                                 <div className='flex space-x-4'>
//                                     <a href=""><FaFacebook className='text-2xl hover:text-blue-400 duration-300' /></a>
//                                     <a href=""><FaInstagram className='text-2xl hover:text-pink-400 duration-300' /></a>
//                                     <a href=""><FaTwitter className='text-2xl hover:text-blue-400 duration-300' /></a>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className='items-center flex flex-col'>
//                             <h3 className='text-lg font-semibold mb-4'>contact us</h3>
//                             <ul className='space-y-2 text-gray-400'>
//                                 <li className='hover:text-white cursor-pointer duration-300'>telegram- CourseHeaven</li>
//                                 <li className='hover:text-white cursor-pointer duration-300'>youtube- CourseHeaven</li>
//                                 <li className='hover:text-white cursor-pointer duration-300'>Github- CourseHeaven</li>
//                             </ul>
//                         </div>

//                         <div className='items-center flex flex-col'>
//                             <h3 className='text-lg font-semibold mb-4'>copyrighs &#169; 2025</h3>
//                             <ul className='space-y-2 text-gray-400'>
//                                 <li className='hover:text-white cursor-pointer duration-300'>Terms & Conditions</li>
//                                 <li className='hover:text-white cursor-pointer duration-300'>Privacy Policy</li>
//                                 <li className='hover:text-white cursor-pointer duration-300'>Refund & Cancellation</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </footer>
//             </div>
//         </div>
//     )   
// }

// export default Home;



import React, { useEffect, useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.log("Error fetching courses", error);
      }
    };
    fetchCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const buyCourse = () => {
    const token = JSON.parse(localStorage.getItem("user"));
    navigate(token ? "/courses" : "/login");
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen px-4 md:px-12 py-12">
      <div className="container mx-auto text-white">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
            <h1 className="text-2xl text-orange-500 font-bold">CourseHeaven</h1>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-2">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="border px-4 py-2 rounded w-full md:w-auto">Logout</button>
            ) : (
              // <>
              //   <Link to="/login" className="border px-4 py-2 rounded w-full md:w-auto text-center">Login</Link>
              //   <Link to="/signup" className="border px-4 py-2 rounded w-full md:w-auto text-center">Signup</Link>
              // </>
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <Link to="/login" className="border px-4 py-3 rounded w-full text-center">Login</Link>
                <Link to="/signup" className="border px-4 py-3 rounded w-full text-center">Signup</Link>
              </div>

            )}
          </div>
        </header>

        <section className="text-center py-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-orange-500">CourseHeaven</h1>
          <p className="text-gray-500 mt-2">Sharpen your skills with expert courses.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/courses" className="bg-green-500 px-6 py-3 rounded text-white hover:bg-white hover:text-black transition w-full md:w-auto text-center">
              Explore Courses
            </Link>
            <Link to="https://www.youtube.com/" className="bg-white px-6 py-3 rounded text-black hover:bg-green-500 hover:text-white transition w-full md:w-auto text-center">
              Course Videos
            </Link>
          </div>
        </section>

        <section className="p-4 md:p-10">
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                  <img className="h-32 w-full object-contain" src={course?.image?.url} alt={course.title} />
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-white">{course.title}</h2>
                    <button onClick={buyCourse} className="mt-4 bg-orange-500 px-4 py-2 rounded-full hover:bg-blue-500 transition">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
        <hr />
        {/* Footer */}
        <footer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left mt-12">
          <div>
            <div className="flex justify-center md:justify-start items-center space-x-2">
              <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
              <h1 className="text-2xl text-orange-500 font-bold">CourseHeaven</h1>
            </div>
            <div className="mt-3">
              <p>Follow us</p>
              <div className="flex justify-center md:justify-start space-x-4 mt-2">
                <FaFacebook className="text-2xl hover:text-blue-400 transition" />
                <FaInstagram className="text-2xl hover:text-pink-400 transition" />
                <FaTwitter className="text-2xl hover:text-blue-400 transition" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="text-gray-400 space-y-2">
              <li className="hover:text-white">Telegram - CourseHeaven</li>
              <li className="hover:text-white">YouTube - CourseHeaven</li>
              <li className="hover:text-white">GitHub - CourseHeaven</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">© 2025</h3>
            <ul className="text-gray-400 space-y-2">
              <li className="hover:text-white">Terms & Conditions</li>
              <li className="hover:text-white">Privacy Policy</li>
              <li className="hover:text-white">Refund & Cancellation</li>
            </ul>
          </div>
        </footer>



      </div>
    </div>
  );
}

export default Home;
