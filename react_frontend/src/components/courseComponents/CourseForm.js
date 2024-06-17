// src/components/CourseForm.js
import React, { useState, useContext } from "react";
import axios from "axios";
import upload from "../../images/upload.png";
import { UserContext } from "../../contexts/userContext";

const CourseForm = () => {
	const [image, setImage] = useState(null);
	const userDetails = useContext(UserContext);
	const [formData, setFormData] = useState({
		course_name: "",
		course_description: "",
		picture: null,
		teacher: userDetails && userDetails.user 
		? `${userDetails.user.firstname || ''} ${userDetails.user.lastname || ''}` 
		: ''
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	console.log("User details: ", userDetails.user);

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
		data.append("userToken", userToken);
		data.append("teacher", 
			userDetails && userDetails.user 
				? `${userDetails.user.firstname || ''} ${userDetails.user.lastname || ''}` 
				: ''
		);
		try {
			const response = await axios.post(
				"http://localhost:8000/courses/courses/create-course/",
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setFormData({
				course_name: "",
				course_description: "",
				picture: null,
				teacher: userDetails && userDetails.user 
				? `${userDetails.user.firstname || ''} ${userDetails.user.lastname || ''}` 
				: '',
			});
			setErrors({});
		} catch (error) {
			if (error.response && error.response.data) {
				setErrors(error.response.data);
			}
		}
	};

	return (
		<div className="py-2 mx-auto items-center justify-center md:ml-[35%] lg:ml-[0%] mt-4 flex flex-row-reverse md:flex-row space-x-7 container gap-2">
			<form onSubmit={handleSubmit} className=" rounded w-[50%] lg:w-[30%]">
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
			<a href="/create-chapter" className="">
				<button className="bg-slate-500 absolute mt-[290px] md:relative md:ml-0 mr-0 w-auto px-2 rounded-3xl flex flex-row text-white font-bold py-3  focus:outline-none focus:shadow-outline gap-2 lg:absolute lg:ml-[40px]">
					<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
					</svg>
					<span className="text-gray-800 dark:text-white">Add Chapter</span>
				</button>
			</a>
		</div>
	);
};

export default CourseForm;