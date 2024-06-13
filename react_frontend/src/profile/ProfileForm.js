import { useEffect, useState } from "react";
import illustration from "../images/illustration.jpg";
import userImg from "../images/user.png";
import userProfileImg from "../images/profile.png";
import axios from "axios";
import edit from "../images/edit.png";

const ProfileForm = ({ user, setIsEditing }) => {
	const [userDetails, setUserDetails] = useState(user);
	// const [userProfile, updateProfile] = useState(null);
	const baseUrl = "http://localhost:8000/users";

	useEffect(() => {
		user && setUserDetails(user);
	}, [user]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
	};
	console.log(userDetails);

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		file && setUserDetails({ ...userDetails, avatar: file });
	};
	console.log(userDetails.avatar instanceof File);
	let dataForm = null;

	const handleSubmit = async () => {
		const userToken = localStorage.getItem("userToken");
		const formData = new FormData();

		for (const key in userDetails) {
			formData.append(key, userDetails[key]);
		}
		console.log(formData);

		if (userDetails && userDetails.avatar instanceof File) {
			formData.append("avatar", userDetails.avatar);
		}
		for (const value of formData.values()) {
			console.log(value);
		}

		try {
			const response = await axios.put(
				"http://localhost:8000/users/profile/",
				formData,
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			console.log("Response:", response.data);
			setUserDetails(response.data);

			// if (response.status === 200) {
			// 	setUserDetails(response.data);
			// 	console.log("User: ", userDetails);
			// 	setIsEditing(false);
			// 	window.location.reload();
			// }
		} catch (error) {
			console.error("Failed to update user data:", error);
		}
	};
	console.log("Edited changes:", userDetails);
	// useEffect(() => [dataForm]);
	console.log(dataForm);

	return (
		<div className=" md:ml-[20%] w-3/4 flex items-center justify-between space-x-4">
			<form className="w-2/4 rounded-lg mt-4" onSubmit={handleSubmit}>
				<aside className="flex items-center space-x-14">
					<img
						src={
							userDetails && userDetails.avatar
								? `${baseUrl}${userDetails.avatar}`
								: illustration
						}
						alt="illustration"
						className="w-32 h-32 rounded-full"
					/>
					<label className="cursor-pointer tracking-wide bg-slate-100 text-lg font-semibold px-16 py-4 rounded-lg">
						Upload photo
						<input
							type="file"
							className="hidden"
							onChange={handleImageChange}
						/>
					</label>
				</aside>
				<aside className="my-4 relative mt-10">
					<input
						className="pl-12 py-4 md:w-[77%] bg-slate-50 border-slate-300 rounded-lg focus:outline-slate-300 w-[100%]"
						type="text"
						placeholder="username"
						name="username"
						// value={userDetails?.firstname || ""}
						onChange={handleInputChange}
					/>
					<img
						src={userImg}
						alt="user"
						className="absolute top-5 left-3 w-5 h-5 opacity-70 "
					/>
					<input
						className="pl-12 mt-4 py-4 md:w-[77%] bg-slate-50 border-slate-300 rounded-lg focus:outline-slate-300 w-[100%]"
						type="text"
						placeholder="email"
						name="email"
						// value={userDetails?.firstname || ""}
						onChange={handleInputChange}
					/>
					<textarea
						// cols={3}
						rows={3}
						name="bio"
						placeholder="Short bio..."
						className="resize-none my-3 pl-12 py-3 bg-slate-50 border-slate-300 rounded-lg md:w-[77%] focus:outline-none"
					></textarea>
					<img
						src={userProfileImg}
						alt="user"
						className="absolute top-40 w-5 h-5 left-3 opacity-70"
					/>
				</aside>
				<button className="w-[77%] bg-slate-600 py-4 rounded-lg text-white font-bold tracking-wide">
					Save Changes
				</button>
			</form>
			<aside className="w-[50%]">
				<img src={edit} alt="edit illustration" />
			</aside>
		</div>
	);
};

export default ProfileForm;
