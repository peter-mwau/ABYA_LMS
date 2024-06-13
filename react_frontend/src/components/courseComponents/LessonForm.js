// src/components/LessonForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LessonForm = () => {
  const [formData, setFormData] = useState({
    lesson_title: '',
    lesson_description: '',
    course: '',
    chapter: '',
  });
  const [wordFile, setWordFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCourses();
    fetchChapters();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/courses/courses',
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('userToken')}`,
          },
        }
      );
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  const fetchChapters = async () => {
    try {
      const response = await axios.get('http://localhost:8000/courses/chapters/', 
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('userToken')}`,
          },}
      );
      setChapters(response.data);
    } catch (error) {
      console.error('Error fetching chapters', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setWordFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('lesson_title', formData.lesson_title);
    formDataToSend.append('lesson_description', formData.lesson_description);
    formDataToSend.append('course', formData.course);
    formDataToSend.append('chapter', formData.chapter);
    if (wordFile) {
      formDataToSend.append('word_file', wordFile);
    }

    try {
      const response = await axios.post('http://localhost:8000/courses/lessons/create-lesson/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${localStorage.getItem('userToken')}`,
        },
      });
      setFormData({
        lesson_title: '',
        lesson_description: '',
        course: '',
        chapter: '',
      });
      setWordFile(null);
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <div className="mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white w-[90%] mx-auto md:mr-[10px] lg:mr-[90px] shadow-md rounded px-8 pt-6 pb-8 mb-4 text-cyan-950 dark:bg-gray-900 md:w-[80%] md:ml-[60px] lg:w-[60%] lg:ml-[400px]">
        <div className="mb-4">
          <label className="block dark:text-gray-100 text-gray-700 text-lg font-bold mb-2" htmlFor="lesson_title">
            Lesson Title
          </label>
          <input
            type="text"
            name="lesson_title"
            id="lesson_title"
            value={formData.lesson_title}
            onChange={handleChange}
            className="appearance-none border-none bg-gray-100 dark:bg-gray-700 dark:text-gray-50 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lesson_title && <p className="text-red-500 text-xs italic">{errors.lesson_title}</p>}
        </div>
        <div className="mb-4">
          <label className="block dark:text-gray-100 text-gray-700 text-lg font-bold mb-2" htmlFor="lesson_description">
            Lesson Description
          </label>
          <textarea
            name="lesson_description"
            id="lesson_description"
            value={formData.lesson_description}
            onChange={handleChange}
            className="appearance-none border-none bg-gray-100 dark:bg-gray-700 dark:text-gray-50 h-[200px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lesson_description && <p className="text-red-500 text-xs italic">{errors.lesson_description}</p>}
        </div>
        <div className="mb-4">
          <label className="block dark:text-gray-100 text-gray-700 text-lg font-bold mb-2" htmlFor="course">
            Course
          </label>
          <select
            name="course"
            id="course"
            value={formData.course}
            onChange={handleChange}
            className="appearance-none border-none bg-gray-100 dark:bg-gray-700 dark:text-gray-50 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.course_name}</option>
            ))}
          </select>
          {errors.course && <p className="text-red-500 text-xs italic">{errors.course}</p>}
        </div>
        <div className="mb-4">
          <label className="block dark:text-gray-100 text-gray-700 text-lg font-bold mb-2" htmlFor="chapter">
            Chapter
          </label>
          <select
            name="chapter"
            id="chapter"
            value={formData.chapter}
            onChange={handleChange}
            className="appearance-none border-none bg-gray-100 dark:bg-gray-700 dark:text-gray-50 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Chapter</option>
            {chapters.map(chapter => (
              <option key={chapter.id} value={chapter.id}>{chapter.chapter_name}</option>
            ))}
          </select>
          {errors.chapter && <p className="text-red-500 text-xs italic">{errors.chapter}</p>}
        </div>
        <div className="mb-4">
          <label className="block dark:text-gray-100 text-gray-700 text-lg font-bold mb-2" htmlFor="word_file">
            Upload Word File
          </label>
          <input
            type="file"
            name="word_file"
            id="word_file"
            onChange={handleFileChange}
            className="appearance-none  border-none dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.word_file && <p className="text-red-500 text-xs italic">{errors.word_file}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-cyan-950 dark:text-cyan-950 hover:bg-yellow-500 dark:bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Lesson
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;
