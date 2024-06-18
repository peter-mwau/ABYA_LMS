import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useCourseDetail = (courseId) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/courses/course_detail/${courseId}/`)
      .then(response => {
        setCourseData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [courseId]);

  return { courseData, loading, error };
};