import React, { useState, useEffect } from "react";
import axios from "axios";
import upload from "../../images/upload.png";

const LessonForm = () => {
	const BASE_URL = process.env.REACT_APP_API_BASE_URL;
	const [formData, setFormData] = useState({
		lesson_name: "",
		lesson_content: "",
		course: "",
		chapter: "",
	});
	const [wordFile, setWordFile] = useState(null);
	const [courses, setCourses] = useState([]);
	const [chapters, setChapters] = useState([]);
	const [errors, setErrors] = useState({});
	const [isLessonCreated, setIsLessonCreated] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [filePreview, setFilePreview] = useState(null);

	useEffect(() => {
		fetchCourses();
		fetchChapters();
	}, []);

	const fetchCourses = async () => {
		try {
			const response = await axios.get(
				`${BASE_URL}/courses/courses`,
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
				`${BASE_URL}/courses/chapters/`,
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

	//Checks the file extension types when user is adding new file
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const allowedFileTypes = [
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/pdf",
		];
		setFilePreview(e.target.files[0].name);

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
		formDataToSend.append("lesson_name", formData.lesson_name);
		formDataToSend.append("lesson_content", formData.lesson_content);
		formDataToSend.append("course", formData.course);
		formDataToSend.append("chapter", formData.chapter);
		if (wordFile) {
			formDataToSend.append("word_file", wordFile);
		}

		try {
			const response = await axios.post(
				`${BASE_URL}/courses/lessons/create-lesson/`,
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				}
			);
			const lessonName = formData.lesson_name; // Save the lesson name
			setFormData({
				lesson_name: "",
				lesson_content: "",
				course: "",
				chapter: "",
			});
			setWordFile(null);
			setErrors({});
			setIsLessonCreated(true);
			setSuccessMessage(`${lessonName} created successfully`); // Use the saved lesson name
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
			{/* <div className="w-full md:w-1/2 relative mb-5">
				<p className="font-bold text-2xl mb-3 ">{courseName}</p>
				<aside className="flex space-x-3 w-3/5 text-gray-400">
					<p className="font-bold">Chapter {lessonCount}</p>
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
					onClick={() => setLessonCount(lessonCount + 1)}
				/>
			</div> */}
			<p className="font-bold text-2xl mb-10">CREATE LESSON</p>
			{successMessage && (
				<p className="text-green-400 font-normal">{successMessage}</p>
			)}

			<div className=" md:flex md:space-x-3">
				<div className="w-full md:w-[60%]">
					<input
						type="text"
						name="lesson_name"
						id="lesson_name"
						value={formData.lesson_name}
						onChange={handleChange}
						placeholder="lesson title"
						className="my-2 border rounded-lg w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>

					<textarea
						name="lesson_content"
						id="lesson_content"
						value={formData.lesson_content}
						onChange={handleChange}
						placeholder="lesson content"
						className="my-4 w-full border rounded-lg resize-none py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>

					{errors.word_file && (
						<p className="text-red-500 text-xs italic">{errors.word_file}</p>
					)}
				</div>
				<div className="">
					<aside className="flex w-full space-x-4">
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
					</aside>
					<label className="cursor-pointer ml-[20%] w-2/5 rounded-lg tracking-wide text-center ">
						<aside className="border border-dashed border-cyan-800 rounded-lg">
							{/* <p className="font-semibold my-4">
							{image ? "Change" : "Choose"} course image
							</p> */}
							<ul className="flex items-center space-x-4 py-4 px-5">
								<li>
									{/* <> */}
									<img
										src={upload}
										alt="upload icon"
										className="w-10 h-10 ml-6"
									/>
									<input
										type="file"
										className="hidden"
										onChange={handleFileChange}
									/>
									{/* </> */}
								</li>
								<li>
									<p className="font-semibold">
										{" "}
										{filePreview
											? `"${filePreview}" selected`
											: "No file selected"}{" "}
									</p>
								</li>
							</ul>
						</aside>
					</label>
				</div>
			</div>
			<div className="flex items-center justify-between">
				{isLessonCreated ? (
					<button
						type="submit"
						className="bg-cyan-950 dark:text-cyan-950 hover:bg-yellow-500 dark:bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Add Lesson
					</button>
				) : (
					<button
						type="submit"
						className="bg-cyan-950 dark:text-cyan-950 hover:bg-yellow-500 dark:bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Create Lesson
					</button>
				)}
			</div>
		</form>
	);
};

export default LessonForm;
