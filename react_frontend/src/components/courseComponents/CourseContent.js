import React, {useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useCourseDetail } from './useCourseDetail';
import axios from 'axios';
import { UserContext } from '../../contexts/userContext';
import { Link } from 'react-router-dom';

const CourseContent = () => {
  const { courseId } = useParams();
  const { courseData, loading, error } = useCourseDetail(courseId);
  const [progress, setProgress] = useState({});
  const { user } = useContext(UserContext)

  const [completedLessons, setCompletedLessons] = useState({});

  const { quizId } = useParams();
  // const { quiz } = useContext(QuizDetail);

  // console.log("Quiz detail: ", quiz);

  // get the total number of lessons
//   const totalLessons = courseData.chapters_with_lessons.reduce((acc, curr) => acc + curr.lessons.length, 0);
//   console.log("Total lessons: ", totalLessons);

  const totalProgress = Object.values(progress).reduce((acc, curr) => acc + curr, 0) / Object.keys(progress).length || 0;


  const HandleMarkAsRead = async (lessonId, chapterIndex, totalLessons) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/courses/courses/mark-lesson-as-complete/',
        { lesson_id: lessonId },
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        setCompletedLessons(prev => ({ ...prev, [lessonId]: true }));
        
        // Update progress for the chapter
        const chapterProgress = ((progress[chapterIndex] || 0) + 1) / totalLessons;
        setProgress(prev => ({
          ...prev,
          [chapterIndex]: chapterProgress
        }));
  
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading course details.</p>;

    // Function to handle marking a lesson as read
    const markAsRead = (chapterIndex, lessonIndex, totalLessons) => {
      // Update progress for the chapter
      const chapterProgress = ((progress[chapterIndex] || 0) + 1) / totalLessons;
      setProgress({
        ...progress,
        [chapterIndex]: chapterProgress
      });
    };


    courseData.chapters_with_lessons_and_quizzes.forEach(chapterWithLessonsAndQuizzes => {
      const chapterId = chapterWithLessonsAndQuizzes.chapter.id;
      console.log("Chapter ID:", chapterId);
    });

    // courseData.chapters_with_lessons_and_quizzes.forEach(chapter => {
    //   chapter.quizzes.forEach(quiz => {
    //     console.log(quiz.id); // This will log each quiz ID
    //   });
    // });

    // Function to find a quiz ID for a given chapter ID
    function getQuizIdForChapter(chapterId) {
      console.log("Requested chapterId:", chapterId); // Debug log
      let quizId = null;
      courseData.chapters_with_lessons_and_quizzes.forEach(chapter => {
        if (chapter.chapter_id === chapterId) {
          quizId = chapter.quizzes.length > 0 ? chapter.quizzes[0].id : null;
        }
      });
      console.log("Found quizId:", quizId); // Debug log
      console.log("Chapter ID: ", chapterId);
      return quizId;
    }

  return (
    <div className=" mx-auto p-4 text-cyan-950 dark:bg-gray-800 dark:text-gray-100 md:pl-[270px] md:m-0 lg:mx-auto  lg:h-[100vh] lg:px-[500px]">
      <h1 className="text-3xl font-bold mb-4 px-2">{courseData.course_name}</h1>
      {user.user_type === "Student" && (
      <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${totalProgress * 100}%` }}
        ></div>
      </div>
      )}
      <p className='text-justify p-2 dark:text-gray-300'>{courseData.course_description}</p>
      <div className="mb-6">
        {/* <h2 className="text-2xl font-semibold mb-2">Chapters</h2> */}
        {courseData.chapters_with_lessons.map((chapter, index) => (
  <div key={index} className="border p-4 mb-4 rounded-lg">
    <h3 className="text-xl font-bold">{chapter.chapter.chapter_name}</h3>
    {/* Assuming `getQuizIdForChapter` is a function that returns the quiz ID for a given chapter ID */}
    <Link to={`/quiz-detail/${getQuizIdForChapter(quizId)}`} className="text-cyan-900 hover:text-yellow-400 underline hover:cursor-pointer">Take Quiz</Link>
    {/* <Link to={`/quiz/${quizId}`}>Go to Quiz</Link> */}
    <div className="mt-4">
      {chapter.lessons.map((lesson, lessonIndex) => (
        <div key={lesson.id} className="ml-4 mt-2">
          <h5 className="text-gray-800 font-semibold text-xl">{`Lesson ${lessonIndex + 1}: ${lesson.lesson_name}`}</h5>
          <p className="text-gray-700  dark:text-gray-300">{lesson.lesson_content}</p>
          <p className='my-2 text-yellow-500'>Video: {lesson.video}</p>
          {user.user_type === "Student" && !completedLessons[lesson.id] && (
                      <button 
                        onClick={() => HandleMarkAsRead(lesson.id, index, chapter.lessons.length)} 
                        className='bg-cyan-950 text-gray-200 rounded hover:bg-yellow-500 p-2 font-semibold'
                      >
                        Mark as Read
                      </button>
                    )}
                    {completedLessons[lesson.id] && (
                      <p className="text-green-500">Lesson completed!</p>
                    )}
        </div>
      ))}
    </div>
  </div>
))}
      </div>


      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Quizzes</h2>
        {courseData.chapters_with_lessons_and_quizzes.map((chapter, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg">
            <h3 className="text-xl font-bold">{chapter.chapter.name}</h3>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Quizzes</h4>
              {chapter.quizzes.map((quiz) => (
                <div key={quiz.id} className="ml-4 mt-2">
                  <p className="text-gray-800">{quiz.quiz_title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;