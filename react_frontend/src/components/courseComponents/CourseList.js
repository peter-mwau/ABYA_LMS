// src/components/CourseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        console.log(response.data);
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
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      {courses.length === 0 ? (
        <div>No courses available at the moment.</div>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-xl font-bold mb-2">{course.course_name}</h2>
              <p className="text-gray-700">{course.course_description}</p>
              <p className="text-sm text-gray-500">Teacher: {course.teacher.username}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
