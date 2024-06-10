// src/components/CourseForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';

const CourseForm = () => {
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
        },
      });
      setFormData({
        course_name: '',
        course_description: '',
        picture: null,
      });
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <div>
    
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_name">
            Course Name
          </label>
          <input
            type="text"
            name="course_name"
            id="course_name"
            value={formData.course_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.course_name && <p className="text-red-500 text-xs italic">{errors.course_name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_description">
            Course Description
          </label>
          <textarea
            name="course_description"
            id="course_description"
            value={formData.course_description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.course_description && <p className="text-red-500 text-xs italic">{errors.course_description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">
            Course Picture
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.picture && <p className="text-red-500 text-xs italic">{errors.picture}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CourseForm;
