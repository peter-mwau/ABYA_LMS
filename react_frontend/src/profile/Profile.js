import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
import illustration from "../images/illustration.jpg";
import background from "../images/background.jpg";
import ProfileForm from "./ProfileForm";
import { UserContext } from "../contexts/userContext";
// import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';
// import Navbar from './Navbar';

const Profile = () => {
	const { user } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	// console.log(user);
	// useEffect(() => {
	// 	const fetchProfile = async () => {
	// 		const userToken = localStorage.getItem("userToken");
	// 		console.log(userToken);
	// 		try {
	// 			const response = await axios.get(
	// 				"http://localhost:8000/users/profile/",
	// 				{
	// 					headers: {
	// 						Authorization: `Token ${userToken}`,
	// 					},
	// 				}
	// 			);
	// 			updateUser(response.data);
	// 			console.log("Fetched data:", response.data);
	// 			// console.log('Fetched profile:', response.data.profile);
	// 			updateProfile(response.data.profile);
	// 			setIsLoading(false);
	// 		} catch (error) {
	// 			console.error("Failed to fetch profile:", error);
	// 			setIsLoading(false);
	// 		}
	// 	};

	// 	fetchProfile();
	// }, []);

	// const handleImageChange = (event) => {
	// 	const file = event.target.files[0];

	// 	if (file) {
	// 		updateProfile({
	// 			...profile,
	// 			avatar: file,
	// 		});
	// 	}
	// };

	// console.log("Current profile:", profile);

	// const handleInputChange = (event) => {
	// 	const { name, value } = event.target;

	// 	if (name in user) {
	// 		updateUser({
	// 			...user,
	// 			[name]: value,
	// 		});
	// 	} else if (profile && name in profile) {
	// 		updateProfile({
	// 			...profile,
	// 			[name]: value,
	// 		});
	// 	}
	// };

	// const handleEdit = () => {
	// 	setIsEditing(true);
	// };

	// const handleSave = async () => {
	// 	const userToken = localStorage.getItem("userToken");
	// 	const formData = new FormData();

	// 	for (const key in user) {
	// 		formData.append(key, user[key]);
	// 	}

	// 	if (profile && profile.avatar instanceof File) {
	// 		formData.append("avatar", profile.avatar);
	// 	}

	// 	try {
	// 		const response = await axios.put(
	// 			"http://localhost:8000/users/profile/",
	// 			formData,
	// 			{
	// 				headers: {
	// 					Authorization: `Token ${userToken}`,
	// 				},
	// 			}
	// 		);

	// 		if (response.status === 200) {
	// 			updateUser(response.data);
	// 			console.log("Userr: ", user);
	// 			setIsEditing(false);
	// 			window.location.reload();
	// 		}
	// 	} catch (error) {
	// 		console.error("Failed to update user data:", error);
	// 	}
	// };

	if (!user) {
		return <div>Loading...</div>;
	}
	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }
	const baseUrl = "http://localhost:8000/users";

	return (
		<>
			{isEditing ? (
				<ProfileForm user={user} />
			) : (
				<div className="border rounded-xl mt-4 overflow-y-hidden relative md:ml-[20%] w-[78%] bg-transparent md:h-[80vh] text-cyan-900">
					<img
						src={background}
						alt="bg"
						className="h-[60%] w-full -mt-40 -z-10 relative opacity-80"
					/>
					<div className="px-10">
						{/* user profile photo */}
						<img
							src={
								user && user.avatar ? `${baseUrl}${user.avatar}` : illustration
							}
							alt="avatar"
							className="w-28 h-28 -mt-16 rounded-2xl border-slate-400 border-4"
						/>
						<aside className="flex justify-between items-center mt-4">
							<section>
								<p className="font-bold text-black text-2xl capitalize">
									{user?.firstname} {user?.lastname}
								</p>
								<p className="font-medium">{user?.email}</p>
								{user.phone === null && <p>{user?.phone}</p>}
							</section>
							<p className="text-sm text-black font-bold py-2 px-12 bg-slate-100 rounded-2xl">
								{user.user_type}
							</p>
						</aside>
						<section className="flex space-x-4 my-4">
							<button
								className="bg-slate-800 px-8 py-2 text-white rounded-3xl"
								onClick={() => setIsEditing(true)}
							>
								Edit Profile
							</button>
							<button className="px-6 py-2 text-black font-semibold border-2 rounded-3xl border-slate-800">
								Settings
							</button>
						</section>
						<aside className="flex justify-between items-center space-x-3 mt-8">
							<div className="bg-slate-100 flex-1 rounded-xl p-4 ">
								<h3 className="font-semibold text-lg text-black">
									Ready to {user?.user_type === "Student" ? "learn" : "teach"}
								</h3>
								<p className="text-black my-2">
									{user?.user_type === "Student"
										? "Enroll in courses you're interested in."
										: "Upload courses for students."}
								</p>
							</div>
							<div className="bg-slate-100 flex-1 rounded-xl p-4">
								<h3 className="font-semibold text-lg text-black">Update</h3>
								<p className="text-black my-2">Keep your profile updated</p>
							</div>
							<div className="bg-slate-100 flex-1 rounded-xl p-4">
								<h3 className="font-semibold text-lg text-black">Update</h3>
								<p className="text-black my-2">Keep your profile updated</p>
							</div>
						</aside>
						{/* <div className="flex space-x-10 items-center my-3">
							
							<p className="w-14 right-28 text-xs rounded-3xl py-1 px-3 text-green-500 border border-green-400 items-center">
								{user.isactive && `active`}
							</p>
						</div> */}
						{/* <p>{user.bio !== null ? user.bio : "Your short bio stays here!"}</p> */}
						{/* <section className="w-[38%] mt-5">
						<p className="font-semibold">Name</p>
						<p className="px-2 py-4 bg-slate-100 text-lg rounded-lg">
							{user.firstname} {user.lastname}
						</p>

						<p className="mt-4 font-semibold">Member since</p>
						<p className="px-2 py-4 bg-slate-100 text-lg rounded-lg">
							{user?.datejoined.slice(0, 11)}
						</p>

						<button
							type="submit"
							className="py-4 px-40 mt-10 font-semibold hover:bg-slate-700 border cursor-pointer border-slate-700 hover:text-white rounded-lg transition-all duration-300"
						>
							Edit
						</button>
					</section> */}
					</div>

					{/* <div className=" shadow-cyan-950 p-5 rounded-md lg:w-[70%] lg:items-center lg:justify-center lg:mx-auto">
						<h2 className="text-center p-4 font-semibold text-2xl uppercase lg:pb-[40px]">
							Profile Details
						</h2>
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-4 lg:justify-evenly lg:w-[80%] lg:mx-auto">
							<p>
								Username:{" "}
								{isEditing ? (
									<input
										name="username"
										value={user.username}
										onChange={handleInputChange}
										className="border-gray-500 border-2 rounded-md p-2"
									/>
								) : (
									user.username
								)}
							</p>
							<p>
								First Name:{" "}
								{isEditing ? (
									<input
										name="firstname"
										value={user.firstname}
										onChange={handleInputChange}
										className="border-gray-500 border-2 rounded-md p-2"
									/>
								) : (
									user.firstname
								)}
							</p>
							<p>
								Last Name:{" "}
								{isEditing ? (
									<input
										name="lastname"
										value={user.lastname}
										onChange={handleInputChange}
										className="border-gray-500 border-2 rounded-md p-2"
									/>
								) : (
									user.lastname
								)}
							</p>
							<p>
								Email:{" "}
								{isEditing ? (
									<input
										name="email"
										value={user.email}
										onChange={handleInputChange}
										className="border-gray-500 border-2 rounded-md p-2"
									/>
								) : (
									user.email
								)}
							</p>
							<p>Is Superuser: {user.issuperuser ? "Yes" : "No"}</p>
							<p>Is Staff: {user.isstaff ? "Yes" : "No"}</p>
							<p>Date Joined:{user.datejoined}</p>
							<p>Last Login: {user.lastlogin}</p>
							<p>Is Active: {user.isactive ? "Yes" : "No"}</p>
							<p>User Type: {user.user_type}</p>
							<p>
								Phone Number:{" "}
								{isEditing ? (
									<input
										name="phone"
										type="number"
										value={user ? user.phone : ""}
										onChange={handleInputChange}
										className="border-gray-500 border-2 rounded-md p-2"
									/>
								) : (
									"+254 " + user.phone
								)}
							</p>
							<p>
								Bio:{" "}
								{isEditing ? (
									<textarea
										name="bio"
										value={user ? user.bio : ""}
										onChange={handleInputChange}
										className="border-gray-500 border-2 rounded-md p-2"
									/>
								) : (
									user.bio
								)}
							</p>
							<p>
								Avatar:{" "}
								{isEditing ? (
									<input
										type="file"
										name="avatar"
										onChange={handleImageChange}
										className="rounded-md p-2"
									/>
								) : (
									user.avatar
								)}
							</p>
						</div>
						<button
							className="bg-cyan-950 hover:bg-yellow-500 text-white uppercase hover:cursor-pointer p-2 items-center justify-center mx-auto w-[70%] rounded-md font-semibold flex mt-[80px]"
							onClick={isEditing ? handleSave : handleEdit}
						>
							{isEditing ? "Save" : "Edit"}
						</button>
					</div> */}
				</div>
			)}
		</>
	);
};

export default Profile;
