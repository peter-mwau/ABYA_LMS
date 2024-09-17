import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useCourseDetail = (courseId) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Define a function to fetch course details
    const fetchCourseDetails = () => {
      axios.get(`${BASE_URL}/courses/course_detail/${courseId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('userToken')}`
        }
      })
      .then(response => {
        setCourseData(response.data);
        console.log("Response: ", response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error("Failed to load course summary:", error);
        setErrorMessage(`Error loading course summary. Please try again later. If the problem persists, contact support. Error details: ${error.message}`);
      });
    };
  
    // Call fetchCourseDetails initially
    fetchCourseDetails();
  
    // Set up polling with setInterval
    const intervalId = setInterval(fetchCourseDetails, 20000);
  
    // Return a cleanup function to clear the interval when the component unmounts or courseId changes
    return () => clearInterval(intervalId);
  }, [courseId]);
  

  return { courseData, loading, error, errorMessage };
};