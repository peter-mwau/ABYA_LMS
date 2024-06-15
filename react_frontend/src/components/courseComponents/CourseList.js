// src/components/CourseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
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
    <div className="mx-auto mt-10 lg:w-[90%]">
      <h1 className="text-2xl font-bold mb-4 md:ml-[275px] text-center text-cyan-950">My Courses</h1>
      {courses.length === 0 ? (
        <div>No courses available at the moment.</div>
      ) : (
        <ul className="gap-3 container md:w-[60%] md:ml-[275px] lg:ml-[285px] lg:grid lg:grid-cols-3 lg:w-[80%]">
          {courses.map((course) => (
            <li key={course.id} className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-gray-800">
              <img src={`${baseUrl}${course.picture}`} alt={course.course_name} className="w-full h-48 object-cover mt-4 rounded-md"/>
              <h2 className="text-xl font-bold mb-2 pt-2">{course.course_name}</h2>
              {/* <p className="text-gray-700 h-[150px]">{course.course_description}</p> */}
              <p className="text-gray-700 line-clamp-3">{course.course_description}</p>
              <p className="text-sm text-gray-500">Teacher: {course.teacher}</p>    
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
