import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseDetail } from './useCourseDetail';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseInfo = () => {
  const { courseId } = useParams();
  const { courseData, loading, error } = useCourseDetail(courseId);
  const { user } = useContext(UserContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    if (courseData) { // Add this check to ensure courseData is not null
      const enrollments = courseData.enrollments || [];
      const userIsEnrolled = enrollments.some(enrollment => enrollment.student_id === user.id);
      setIsEnrolled(userIsEnrolled);
    }
  }, [courseData, user]);

  // useEffect(() => {
  //   console.log("Enrollment status updated: ", isEnrolled);
  // }, [isEnrolled]);
  // console.log("Enrollment status1: ", isEnrolled);

  const enrollCourse = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const response = await axios.post(`http://localhost:8000/courses/enroll/${courseId}/`, {},
        {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });

      if (response.status !== 200) {
        // throw new Error('Failed to enroll in the course');
        setErrorMessage(response.data)
      }

      // Update enrollment status
      setIsEnrolled(true);
      setErrorMessage('');
      // console.log("Enrollment status2: ", isEnrolled);
    } catch (error) {
      console.error("Error enrolling in course: ", error);
      setErrorMessage(error.message[0] || "An error occurred");
    }
  };

  const unenrollCourse = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const response = await axios.post(`http://localhost:8000/courses/unenroll/${courseId}/`, {},
        {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });

      if (response.status !== 200) {
        // throw new Error('Failed to unenroll from the course');
        setErrorMessage(response.data)
      }

      // Update enrollment status
      setIsEnrolled(false);
    } catch (error) {
      console.error(error);
    }
  };
  


  console.log("Course Info: ",courseData);
  console.log("User: ", user);
  console.log("Enrollment status2: ", isEnrolled);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading course summary.</p>;

  const numberOfChapters = courseData.chapters_with_lessons.length;
  const numberOfLessons = courseData.chapters_with_lessons.reduce((acc, chapter) => acc + chapter.lessons.length, 0);

  return (
    <>
    <div className='dark:bg-gray-800 h-[100vh]'>
    <div className="mx-auto p-4 text-cyan-950 dark:text-gray-100 md:pl-[280px] md:w-[90%] lg:w-[60%] lg:pl-[200px]">
      <h1 className="text-3xl font-bold mb-4">{courseData.course_name}</h1>
      {errorMessage && <div className='text-red-500 py-3'>{errorMessage}</div>}
      <p className='text-justify dark:text-gray-300'>{courseData.course_description}</p>
      <p className='mt-2'>Number of Chapters: <spam className="font-bold px-2">{numberOfChapters}</spam></p>
      <p>Number of Lessons: <spam className="font-bold px-2">{numberOfLessons}</spam></p>
      <p>Course Creator: <spam className="font-bold px-2">{courseData.course_creator}</spam></p>
      
      {user.user_type ==="Student" && (
      // {
        // isEnrolled !== null && (
          isEnrolled ? (
            <button className='bg-red-600 dark:bg-red-600 dark:text-white text-gray-100 p-2 rounded my-2 font-semibold' onClick={unenrollCourse}>Unenroll</button>
          ) : (
            <button className='bg-cyan-950 text-gray-100 p-1 rounded my-2 font-semibold dark:bg-gray-200 dark:text-cyan-950' onClick={enrollCourse}>Enroll</button>
          )
        // )
      // }
      )}
      
      {isEnrolled && (
      <button onClick={() => navigate(`/course/${courseId}`)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4'>
        More Info
      </button>
    )}
    {user.user_type === "Teacher" && (
      <button onClick={() => navigate(`/course/${courseId}`)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4'>
        More Info
      </button>
    )}
    </div>
    </div>
    </>
  );
};


export default CourseInfo;