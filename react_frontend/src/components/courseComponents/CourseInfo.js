import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseDetail } from './useCourseDetail';
import { UserContext } from '../../contexts/userContext';
import { Link } from 'react-router-dom';

const CourseInfo = () => {
  const { courseId } = useParams();
  const { courseData, loading, error } = useCourseDetail(courseId);
  const { user } = useContext(UserContext);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // useEffect(() => {
  //   // Placeholder for checking enrollment status
  //   const enrolled = checkIfUserIsEnrolled(user, courseId); // Implement this function based on your logic
  //   setIsEnrolled(enrolled);
  // }, [user, courseId]);

  // const enrollToCourse = async (courseId) => {
  //   // Implement API call for enrollment
  // };

  // const unenrollFromCourse = async (courseId) => {
  //   // Implement API call for unenrollment
  // };

  // const enroll = async () => {
  //   console.log("Enrolling user...");
  //   try {
  //     await enrollToCourse(courseId);
  //     setIsEnrolled(true);
  //   } catch (error) {
  //     console.error("Enrollment failed", error);
  //   }
  // };

  // const unenroll = async () => {
  //   console.log("Unenrolling user...");
  //   try {
  //     await unenrollFromCourse(courseId);
  //     setIsEnrolled(false);
  //   } catch (error) {
  //     console.error("Unenrollment failed", error);
  //   }
  // };

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
      <Link to={`/course/${courseId}`} className='bg-cyan-950 hover:bg-yellow-500 rounded dark:bg-gray-200 dark:text-gray-900 font-semibold text-gray-200 p-2 my-3 hover:cursor-pointer lg:mt-[100px'>
        {isEnrolled ? 'Unenroll' : 'Enroll'}
      </Link>
    </div>
    </div>
    </>
  );
};


export default CourseInfo;