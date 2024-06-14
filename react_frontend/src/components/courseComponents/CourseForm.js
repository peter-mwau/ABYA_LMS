// src/components/CourseForm.js
import React, { useState } from 'react';
import axios from 'axios';
// import Navbar from '../../Navbar';

const CourseForm = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    course_name: '',
    course_description: '',
    picture: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('course_name', formData.course_name);
    data.append('course_description', formData.course_description);
    data.append('picture', formData.picture);
    try {
      const response = await axios.post('http://localhost:8000/courses/courses/create-course/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${localStorage.getItem('userToken')}`,
        },
      });
      setFormData({
        course_name: '',
        course_description: '',
        picture: null,
      });
      setErrors({});
      setSuccessMessage('Course created successfully!');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <>
    
    <div className="mx-auto mt-10 md:w-[62%] md:mr-[50px] text-cyan-950 lg:mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-900">
      {successMessage && <div className='text-green-400 font-light'>{successMessage}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" htmlFor="course_name">
            Course Name
          </label>
          <input
            type="text"
            name="course_name"
            id="course_name"
            value={formData.course_name}
            onChange={handleChange}
            className="bg-gray-100 appearance-none border-none rounded dark:bg-gray-700 dark:text-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.course_name && <p className="text-red-500 text-xs italic">{errors.course_name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" htmlFor="course_description">
            Course Description
          </label>
          <textarea
            name="course_description"
            id="course_description"
            value={formData.course_description}
            onChange={handleChange}
            className="bg-gray-100 appearance-none border-none dark:bg-gray-700 dark:text-gray-50 outline-none rounded w-full h-[150px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.course_description && <p className="text-red-500 text-xs italic">{errors.course_description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-100 text-lg font-bold mb-2" htmlFor="picture">
            Course Picture
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={handleFileChange}
            className="appearance-none border-none rounded w-full py-2 px-3 text-gray-900 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.picture && <p className="text-red-500 text-xs italic">{errors.picture}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-cyan-950 dark:bg-gray-300 dark:text-cyan-950 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CourseForm;
