import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useCourseDetail = (courseId) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      });
  }, [courseId]);

  return { courseData, loading, error };
};