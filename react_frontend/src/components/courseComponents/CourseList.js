// src/components/CourseList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Tutor_dashboard from './Tutor_dashboard';
import { UserContext } from "../../contexts/userContext";

const CourseList = () => {
  const userDetails = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:8000/courses";
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userToken = localStorage.getItem('userToken')
        console.log(userToken);
        const response = await axios.get('http://localhost:8000/courses/courses/list-courses/', 
          {
            headers: {
              Authorization: `Token ${userToken}`,
            },
          }
        );
        setCourses(response.data);
        console.log("Courses: ",response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data : 'Error fetching courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
    {userDetails.user.user_type === "Student" && (
    <div className="mx-auto mt-10 lg:w-[90%]">
      <h1 className="text-2xl font-bold mb-4 md:ml-[275px] text-center text-cyan-950">My Courses</h1>
      {courses.length === 0 ? (
        <div className='lg:ml-[250px]'>No courses available at the moment.</div>
      ) : (
        <ul className="container w-[80%] mx-auto md:w-[60%] md:ml-[300px] md:grid-cols-2 md:grid md:gap-3 lg:ml-[285px] lg:grid lg:grid-cols-4 lg:w-[80%]">
          {courses.map((course) => (
            <li key={course.id} className="bg-white shadow-lg rounded-3xl lg:rounded-3xl md:rounded-3xl mb-4 w-full dark:bg-gray-800 dark:text-gray-200 lg:w-[300px]">
              <img src={`${baseUrl}${course.picture}`} alt={course.course_name} className="w-full h-40 object-cover rounded-tl-3xl rounded-tr-3xl"/>
              <h2 className="text-xl font-bold mb-2 pt-2 p-2">{course.course_name}</h2>
              <p className="text-sm text-gray-500 p-2">Tutor: {course.teacher_name}</p>
              {/* <p className="text-gray-700 h-[150px]">{course.course_description}</p> */}
              <p className="text-gray-700 line-clamp-3 dark:text-gray-300 p-2">{course.course_description}</p>
              {/* <div className='flex gap-2 flex-row pt-4 pb-2 pl-2'> */}
               
              <div className='flex flex-row items-center justify-center mx-auto gap-3 mb-1 pt-4 pb-2'>
                <button className="dark:bg-slate-500 dark:text-white bg-gray-200 text-cyan-950 hover:shadow-lg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline">Enroll</button>
                <button className="dark:bg-slate-500 dark:text-white bg-gray-200 text-cyan-950 hover:shadow-lg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline">View Course</button>
              {/* </div> */}
              </div>   
            </li>
          ))}
        </ul>
      )}
    </div>
    )}
    {userDetails.user.user_type === "Teacher" && (
      <Tutor_dashboard />
    )}
    </>
  );
};

export default CourseList;
