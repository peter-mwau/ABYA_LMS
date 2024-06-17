// src/components/CourseForm.js
import React, { useContext, useState } from "react";
import axios from "axios";
import upload from "../../images/upload.png";
import { CourseContext } from "./CreateCourse";

const CourseForm = ({ step, formData, setFormData }) => {
	const [image, setImage] = useState(null);
	const { setCourse } = useContext(CourseContext);

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
		setImage(URL.createObjectURL(e.target.files[0]));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userToken = localStorage.getItem("userToken");

		const data = new FormData();
		data.append("course_name", formData.course_name);
		data.append("course_description", formData.course_description);
		data.append("picture", formData.picture);
		try {
			const response = await axios.post(
				"http://localhost:8000/courses/courses/create-course/",
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				}
			);
			setFormData({
				course_name: "",
				course_description: "",
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
		<form
			onSubmit={handleSubmit}
			className="flex md:space-x-10 justify-between rounded w-full"
		>
			<div className="mt-5 w-2/3">
				<p className="font-bold text-2xl mb-10">{step.title}</p>

				<input
					type="text"
					name="course_name"
					id="course_name"
					value={formData.course_name}
					onChange={handleChange}
					placeholder="course title"
					className="my-2 border rounded-lg w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
				<textarea
					name="course_description"
					id="course_description"
					value={formData.course_description}
					onChange={handleChange}
					rows={3}
					placeholder="course description"
					className="my-10 w-full border rounded-lg resize-none py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>

			<label className="cursor-pointer ml-[20%] w-2/5 rounded-lg tracking-wide mt-12 text-center ">
				<aside
					className={`${
						image && "py-4 bg-gray-50"
					} rounded-lg p-10 text-center items-center border border-dashed`}
				>
					<img
						src={image ? image : upload}
						alt="upload icon"
						className={`${
							image && "w-40 border-slate-600 h-40 ml-0"
						} w-20 h-20 ml-6 rounded`}
					/>
					<p className="font-semibold my-4">
						{image ? "Change" : "Choose"} course image
					</p>

					<input type="file" className="hidden" onChange={handleFileChange} />
				</aside>
			</label>
			{/* <button
				type="submit"
				className="bg-slate-500 w-full text-white font-bold py-3 rounded-lg focus:outline-none focus:shadow-outline mt-4"
			>
				Create Course
			</button> */}
		</form>
	);
};

export default CourseForm;