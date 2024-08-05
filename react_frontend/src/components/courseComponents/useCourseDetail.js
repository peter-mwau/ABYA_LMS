import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useCourseDetail = (courseId) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/courses/course_detail/${courseId}/`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('userToken')}`
        }
      }
    )
      .then(response => {
        setCourseData(response.data);
        console.log("Response: ", response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error("Failed to load course summary:", error);
      // Assuming setErrorMessage is a function that updates the state to display an error message
      setErrorMessage(`Error loading course summary. Please try again later. If the problem persists, contact support. Error details: ${error.message}`);
      setError(error);
      });
  }, [courseId]);
  

  return { courseData, loading, error };
};