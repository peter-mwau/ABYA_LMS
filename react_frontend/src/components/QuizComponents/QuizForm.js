import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const QuizForm = () => {
	const navigate = useNavigate();
	const userDetails = useContext(UserContext);

	const [formData, setFormData] = useState({
		course: "",
		chapter: "",
		quiz_title: "",
		quiz_description: "",
	});

	const [courses, setCourses] = useState([]);
	const [chapters, setChapters] = useState([]);

	useEffect(() => {
		fetchCourses();
		fetchChapters();
	}, []);

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
			console.error("Error fetching courses:", error);
		}
	};

	const fetchChapters = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/courses/chapters/",
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				}
			);
			setChapters(response.data);
		} catch (error) {
			console.error("Error fetching chapters:", error);
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
		formDataToSend.append("course", formData.course);
		formDataToSend.append("chapter", formData.chapter);
		formDataToSend.append("quiz_title", formData.quiz_title);
		formDataToSend.append("quiz_description", formData.quiz_description);

		// Log form data to check what is being sent
		for (let pair of formDataToSend.entries()) {
			console.log(pair[0] + ": " + pair[1]);
		}

		try {
			const response = await axios.post(
				"http://localhost:8000/assignments/quiz/create-quiz/",
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				}
			);

			setFormData({
				course: "",
				chapter: "",
				quiz_title: "",
				quiz_description: "",
			});
			navigate("/create-question");
		} catch (error) {
			console.error("Error creating quiz:", error);
			if (error.response && error.response.data) {
				console.error("Server response:", error.response.data);
			}
		}
	};

	return (
		<div className="md:w-3/4 w-full text-cyan-950">
			<form onSubmit={handleSubmit} className="mb-4 dark:bg-gray-900">
				<input
					type="text"
					name="quiz_title"
					id="quiz_title"
					value={formData.quiz_title}
					onChange={handleChange}
					placeholder="Quiz title"
					className="border appearance-none rounded-lg dark:bg-gray-700 dark:text-gray-50 w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
				<select
					name="course"
					id="course"
					value={formData.course}
					onChange={handleChange}
					className="my-4 appearance-none border rounded-lg dark:bg-gray-700 dark:text-gray-50 w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				>
					<option value="">Select Course</option>
					{courses.map((course) => (
						<option key={course.id} value={course.id}>
							{course.course_name}
						</option>
					))}
				</select>

				<select
					name="chapter"
					id="chapter"
					value={formData.chapter}
					onChange={handleChange}
					className="appearance-none border rounded-lg dark:bg-gray-700 dark:text-gray-50 w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				>
					<option value="">Select Chapter</option>
					{chapters.map((chapter) => (
						<option key={chapter.id} value={chapter.id}>
							{chapter.chapter_name}
						</option>
					))}
				</select>

				<textarea
					name="quiz_description"
					id="quiz_description"
					value={formData.quiz_description}
					onChange={handleChange}
					placeholder="short decription..."
					className=" my-4 resize-none appearance-none border dark:bg-gray-700 dark:text-gray-50 outline-none rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-cyan-950 w-full md:w-1/2 dark:bg-gray-300 dark:text-cyan-950 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default QuizForm;
