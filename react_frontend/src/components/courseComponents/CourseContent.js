import React from 'react';
import { useParams } from 'react-router-dom';
import { useCourseDetail } from './useCourseDetail';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { courseData, loading, error } = useCourseDetail(courseId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading course details.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{courseData.course_id}</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Chapters</h2>
        {courseData.chapters_with_lessons.map((chapter, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg">
            <h3 className="text-xl font-bold">{chapter.chapter.name}</h3>
            <p className="text-gray-700">{chapter.chapter.description}</p>

            <div className="mt-4">
              <h4 className="text-lg font-semibold">Lessons</h4>
              {chapter.lessons.map((lesson) => (
                <div key={lesson.id} className="ml-4 mt-2">
                  <p className="text-gray-800">{lesson.name}</p>
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
                  <p className="text-gray-800">{quiz.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
