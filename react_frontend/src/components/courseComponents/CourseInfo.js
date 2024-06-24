import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseDetail } from './useCourseDetail';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';

const CourseInfo = () => {
  const { courseId } = useParams();
  const { courseData, loading, error } = useCourseDetail(courseId);
  const { user } = useContext(UserContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  

  const unenrollCourse = async () => {
    try {
      const userToken = localStorage.getItem('userToken')
      const response = await axios.post(`http://localhost:8000/courses/unenroll/${courseId}/`, {},
        {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });
  
      if (!response.ok) {
        throw new Error('Failed to unenroll from the course');
      }
  
      // Handle successful unenrollment
      alert('Successfully unenrolled from the course');
      setIsEnrolled(false);
    } catch (error) {
      console.error('Error unenrolling from the course:', error);
      alert('Error unenrolling from the course');
    }
  };

  const handleEnrollClick = async () => {
    if (isEnrolled) {
      unenrollCourse();
    }
    else {
   
    try {
      const userToken = localStorage.getItem('userToken')
      console.log("Retrieved token:", userToken);
      const response = await axios.post(`http://localhost:8000/courses/enroll/${courseId}/`, {},
        {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });
        setIsEnrolled(true)
        console.log("Response: ", response);
  
      if (!response.ok) throw new Error('Failed to enroll');
  
      const data = await response.json();
      console.log('Enrollment success:', data);
      alert("Successfully enrolled")
      // Update component state here to reflect enrollment status
    } catch (error) {
      console.error('Enrollment error:', error);
    }
  };
  };
  


  console.log("Course Info: ",courseData);
  console.log("User: ", user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading course summary.</p>;

  const numberOfChapters = courseData.chapters_with_lessons.length;
  const numberOfLessons = courseData.chapters_with_lessons.reduce((acc, chapter) => acc + chapter.lessons.length, 0);

  return (
    <>
    <div className='dark:bg-gray-800 h-[100vh]'>
    <div className="mx-auto p-4 text-cyan-950 dark:text-gray-100 md:pl-[280px] md:w-[90%] lg:w-[60%] lg:pl-[200px]">
      <h1 className="text-3xl font-bold mb-4">{courseData.course_name}</h1>
      <p className='text-justify dark:text-gray-300'>{courseData.course_description}</p>
      <p className='mt-2'>Number of Chapters: <spam className="font-bold px-2">{numberOfChapters}</spam></p>
      <p>Number of Lessons: <spam className="font-bold px-2">{numberOfLessons}</spam></p>
      <p>Course Creator: <spam className="font-bold px-2">{courseData.course_creator}</spam></p>
      <p>Enrollment Status: <span className="font-bold px-2">{isEnrolled ? 'Enrolled' : 'Not Enrolled'}</span></p>
      <button onClick={handleEnrollClick} className='bg-cyan-950 hover:bg-yellow-500 rounded dark:bg-gray-200 dark:text-gray-900 font-semibold text-gray-200 p-2 my-3 hover:cursor-pointer lg:mt-[100px'>
        {isEnrolled ? 'Unenroll' : 'Enroll'}
      </button>
    </div>
    </div>
    </>
  );
};


export default CourseInfo;