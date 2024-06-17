// src/components/LessonForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const LessonForm = ({ courseName }) => {
	const [formData, setFormData] = useState({
		lesson_title: "",
		lesson_description: "",
		course: courseName ? courseName : "",
		chapter: "",
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
			const response = await axios.get(
				"http://localhost:8000/courses/courses",
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
			console.error("Error fetching chapters", error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// const extNames = ["image/jpeg", "image/png"];
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const allowedFileTypes = [
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/pdf",
		];

		if (!allowedFileTypes.includes(file.type)) {
			setWordFile(null);
			console.error(
				"Invalid file type. Only Word (.docx) and PDF files are allowed."
			);
		} else {
			setWordFile(file);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formDataToSend = new FormData();
		formDataToSend.append("lesson_title", formData.lesson_title);
		formDataToSend.append("lesson_description", formData.lesson_description);
		formDataToSend.append("course", formData.course);
		formDataToSend.append("chapter", formData.chapter);
		if (wordFile) {
			formDataToSend.append("word_file", wordFile);
		}

		try {
			const response = await axios.post(
				"http://localhost:8000/courses/lessons/create-lesson/",
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				}
			);
			setFormData({
				lesson_title: "",
				lesson_description: "",
				course: "",
				chapter: "",
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
		<form
			onSubmit={handleSubmit}
			className="h-full justify-between rounded w-full"
		>
			<div className="w-[70%] md:ml-40">
				<input
					type="text"
					name="lesson_title"
					id="lesson_title"
					value={formData.lesson_title}
					onChange={handleChange}
					placeholder="lesson title"
					className="my-2 border rounded-lg w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>

				{/* <aside className="flex w-full space-x-4">
					<select
						name="course"
						id="course"
						value={formData.course}
						onChange={handleChange}
						className="my-2 border rounded-lg w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
						className="my-2 border rounded-lg w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="">Select Chapter</option>
						{chapters.map((chapter) => (
							<option key={chapter.id} value={chapter.id}>
								{chapter.chapter_name}
							</option>
						))}
					</select>
				</aside> */}

				<textarea
					name="lesson_description"
					id="lesson_description"
					value={formData.lesson_description}
					onChange={handleChange}
					placeholder="lesson description"
					className="my-4 w-full border rounded-lg resize-none py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>

				<label
					className="block dark:text-gray-100 text-gray-700 text-lg font-bold mb-2"
					htmlFor="word_file"
				>
					Upload Word File
				</label>
				<input
					type="file"
					name="word_file"
					id="word_file"
					onChange={handleFileChange}
					className="appearance-none  border-none dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
				{errors.word_file && (
					<p className="text-red-500 text-xs italic">{errors.word_file}</p>
				)}
			</div>
		</form>
	);
};

export default LessonForm;
