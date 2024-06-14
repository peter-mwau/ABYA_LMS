// src/components/CourseForm.js
import React, { useState } from "react";
import axios from "axios";
import upload from "../../images/upload.png";

const CourseForm = () => {
	const [image, setImage] = useState(null);

	const [formData, setFormData] = useState({
		course_name: "",
		course_description: "",
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
		<div className="py-2 max-w-2xl md:ml-[20%] mt-4 flex flex-row-reverse md:flex-row space-x-7">
			<form onSubmit={handleSubmit} className=" rounded w-[50%]">
				<input
					type="text"
					name="course_name"
					id="course_name"
					value={formData.course_name}
					onChange={handleChange}
					placeholder="course title"
					className="border rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>

				<textarea
					name="course_description"
					id="course_description"
					value={formData.course_description}
					onChange={handleChange}
					rows={3}
					placeholder="course description"
					className="my-5  border rounded-lg resize-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>

				<button
					type="submit"
					className="bg-slate-500 w-full text-white font-bold py-3 rounded-lg focus:outline-none focus:shadow-outline"
				>
					Create Course
				</button>
			</form>
			<div>
				<label className="cursor-pointer tracking-wide bg-slate-100 ">
					<aside
						className={`${
							image && "py-4 bg-gray-50"
						} border rounded-lg p-10 text-center`}
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
			</div>
		</div>
	);
};

export default CourseForm;
