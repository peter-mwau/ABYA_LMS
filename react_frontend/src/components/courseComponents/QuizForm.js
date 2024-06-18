import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../../contexts/userContext';

const QuizForm = () => {
    const navigate = useNavigate();
    const userDetails = useContext(UserContext);

    const [formData, setFormData] = useState({
        course: '',
        chapter: '',
        quiz_title: '',
        quiz_description: '',
    });

    const [courses, setCourses] = useState([]);
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        fetchCourses();
        fetchChapters();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/courses/courses/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('userToken')}`,
                },
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchChapters = async () => {
        try {
            const response = await axios.get('http://localhost:8000/courses/chapters/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('userToken')}`,
                },
            });
            setChapters(response.data);
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('course', formData.course);
        formDataToSend.append('chapter', formData.chapter);
        formDataToSend.append('quiz_title', formData.quiz_title);
        formDataToSend.append('quiz_description', formData.quiz_description);
    
        // Log form data to check what is being sent
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    
        try {
            const response = await axios.post('http://localhost:8000/assignments/quiz/create-quiz/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('userToken')}`,
                },
            });
    
            setFormData({
                course: '',
                chapter: '',
                quiz_title: '',
                quiz_description: '',
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating quiz:', error);
            if (error.response && error.response.data) {
                console.error('Server response:', error.response.data);
            }
        }
    };
    

    return (
        <div className="mx-auto mt-10 md:w-[62%] md:mr-[50px] text-cyan-950 lg:mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-900">
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" htmlFor="course">
                        Course
                    </label>
                    <select
                        name="course"
                        id="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="bg-gray-100 appearance-none border-none rounded dark:bg-gray-700 dark:text-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.course_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" htmlFor="chapter">
                        Chapter
                    </label>
                    <select
                        name="chapter"
                        id="chapter"
                        value={formData.chapter}
                        onChange={handleChange}
                        className="bg-gray-100 appearance-none border-none rounded dark:bg-gray-700 dark:text-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Chapter</option>
                        {chapters.map((chapter) => (
                            <option key={chapter.id} value={chapter.id}>
                                {chapter.chapter_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" htmlFor="quiz_title">
                        Quiz Title
                    </label>
                    <input
                        type="text"
                        name="quiz_title"
                        id="quiz_title"
                        value={formData.quiz_title}
                        onChange={handleChange}
                        className="bg-gray-100 appearance-none border-none rounded dark:bg-gray-700 dark:text-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" htmlFor="quiz_description">
                        Quiz Description
                    </label>
                    <textarea
                        name="quiz_description"
                        id="quiz_description"
                        value={formData.quiz_description}
                        onChange={handleChange}
                        className="bg-gray-100 appearance-none border-none dark:bg-gray-700 dark:text-gray-50 outline-none rounded w-full h-[150px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-cyan-950 dark:bg-gray-300 dark:text-cyan-950 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Create Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizForm;
