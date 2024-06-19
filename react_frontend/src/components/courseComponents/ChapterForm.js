// src/components/ChapterForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import right_arrows from "../../images/right-arrows.png";
import add from "../../images/add.png";


const ChapterForm = ({ chapterCount, setChapterCount, courseName }) => {
	const [formData, setFormData] = useState({
		chapter_name: "",
		chapter_description: "",
		course: "",
		chapter_quiz: "",
	});
	const [courses, setCourses] = useState([]);
	const [quizzes, setQuizzes] = useState([]);
	const [errors, setErrors] = useState({});
	const [isChapterCreated, setIsChapterCreated] = useState(false);
	useEffect(() => {
		fetchCourses();
		fetchQuizzes();
	}, []);
	const [successMessage, setSuccessMessage] = useState("");

	const fetchCourses = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/courses/courses/",
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				}
			);
			setCourses(response.data);
		} catch (error) {
			console.error("Error fetching courses", error);
		}
	};

	const fetchQuizzes = async () => {
		try {
			const response = await axios.get("/api/quizzes/");
			setQuizzes(response.data);
		} catch (error) {
			console.error("Error fetching quizzes", error);
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

		try {
			const response = await axios.post(
				"http://localhost:8000/courses/chapters/create-chapter/",
				formData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				}
			);
			const chapterName = formData.chapter_name; // Save the chapter name
			setFormData({
				chapter_name: "",
				chapter_description: "",
				course: "",
				chapter_quiz: "",
			});
			setErrors({});
			setIsChapterCreated(true);
			setSuccessMessage(`${chapterName} created successfully`); // Use the saved chapter name
		} catch (error) {
			if (error.response && error.response.data) {
				setErrors(error.response.data);
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="h-full justify-between rounded w-full md:flex md:space-x-2"
		>

			<div className="w-full md:w-1/2 relative mb-5">
				<p className="font-bold text-2xl mb-3 ">{courseName}</p>
        {successMessage && <p className="text-green-400 font-normal">{successMessage}</p>}
				<aside className="flex space-x-3 w-3/5 text-gray-400">
					<p className="font-bold">Chapter {chapterCount}</p>
					<img
						src={right_arrows}
						alt="right arrow"
						className="w-10 h-7 opacity-40"
					/>
				</aside>
				<img
					src={add}
					alt="add"
					className="absolute md:relative top-10 right-0 w-7 h-7 md:w-10 md:h-10 md:mt-20 opacity-30 cursor-pointer"
					onClick={() => setChapterCount(chapterCount + 1)}
				/>
			</div>
			<div className="w-full md:w-[70%]">
			<p className="font-bold text-2xl mb-10">CREATE CHAPTER</p>

				<input
					type="text"
					name="chapter_name"
					id="chapter_name"
					value={formData.chapter_name}
					onChange={handleChange}
					placeholder="chapter name"
					className="my-2 border rounded-lg w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
				{/* {errors.chapter_name && <p className="text-red-500 text-xs italic">{errors.chapter_name}</p>} */}
				{/* </div> */}
				{/* <div className="mb-4">
          <label className="block text-gray-700 text-lg dark:text-gray-100 font-bold mb-2" htmlFor="chapter_description">
            Chapter Description
          </label> */}
				<textarea
					name="chapter_description"
					id="chapter_description"
					value={formData.chapter_description}
					onChange={handleChange}
					placeholder="chapter description"
					className="my-4 w-full border rounded-lg resize-none py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
				{/* {errors.chapter_description && (
				<p className="text-red-500 text-xs italic">
					{errors.chapter_description}
				</p>
			)} */}
				{/* </div> */}
				<div className="mb-4">
          {/* <label className="block text-gray-700 text-lg dark:text-gray-100 font-bold mb-2" htmlFor="course">
            Course
          </label> */}
          <select
            name="course"
            id="course"
            value={formData.course}
            onChange={handleChange}
            className="appearance-none  border-none bg-gray-100 dark:bg-gray-700 dark:text-gray-50  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.course_name}</option>
            ))}
          </select>
          {errors.course && <p className="text-red-500 text-xs italic">{errors.course}</p>}
        </div>
				{/* <div className="mb-4"> */}
				{/* <label
					className="block text-gray-700 dark:text-gray-100 text-lg font-bold mb-2"
					htmlFor="chapter_quiz"
				>
					Chapter Quiz
				</label> */}
				<select
					name="chapter_quiz"
					id="chapter_quiz"
					value={formData.chapter_quiz}
					onChange={handleChange}
					className="appearance-none  border-none bg-gray-100 dark:bg-gray-700 dark:text-gray-50  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
					<option value="">Select Quiz</option>
					{quizzes.map((quiz) => (
						<option key={quiz.id} value={quiz.id}>
							{quiz.title}
						</option>
					))}
				</select>
				{errors.chapter_quiz && (
					<p className="text-red-500 text-xs italic">{errors.chapter_quiz}</p>
				)}
				{/* </div> */}
				<div className="flex items-center justify-between">
    				{isChapterCreated ? (
        			<button
            			type="submit"
            			className="bg-cyan-950 dark:text-cyan-950 hover:bg-yellow-500 dark:bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            			Add Chapter
        			</button>
    				) : (
        			<button
            			type="submit"
            			className="bg-cyan-950 dark:text-cyan-950 hover:bg-yellow-500 dark:bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            			Create Chapter
        			</button>
    				)}
				</div>
			</div>
		</form>
	);
};

export default ChapterForm;
