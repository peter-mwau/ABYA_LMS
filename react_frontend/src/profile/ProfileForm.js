import { useEffect, useState } from "react";
import illustration from "../images/illustration.jpg";
import userImg from "../images/user.png";
import userProfileImg from "../images/profile.png";
import axios from "axios";
import edit from "../images/edit.png";
import mail from "../images/mail.png";

const ProfileForm = ({ user }) => {
	const [userDetails, setUserDetails] = useState(user);
	const baseUrl = "http://localhost:8000/users";

	useEffect(() => {
		user && setUserDetails(user);
	}, [user]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		file && setUserDetails({ ...userDetails, avatar: file });
	};

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
		} catch (error) {
			console.error("Failed to update user data:", error);
		}
	};

	const deviceWidth = window.innerWidth;

	return (
		<div className="w-auto p-5 md:p-0 md:ml-[20%] md:w-3/4 md:flex items-center justify-between space-x-4">
			<form
				className="w-[100%] md:w-2/4 rounded-lg mt-4"
				onSubmit={handleSubmit}
			>
				<aside className="flex items-center space-x-20 md:space-x-14">
					<img
						src={
							userDetails && userDetails.avatar
								? `${baseUrl}${userDetails.avatar}`
								: illustration
						}
						alt="illustration"
						className="w-24 h-24 md:w-32 md:h-32 rounded-full"
					/>
					<label className="cursor-pointer tracking-wide bg-slate-100 text-base font-semibold px-10 md:px-16 py-4 rounded-lg">
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
						value={userDetails?.username || ""}
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
						value={userDetails?.email || ""}
						onChange={handleInputChange}
					/>
					<img
						src={mail}
						alt="user"
						className="absolute top-24 left-3 w-5 h-5 opacity-70 "
					/>
					<textarea
						// cols={3}
						rows={3}
						name="bio"
						placeholder="Short bio..."
						className="resize-none my-3 pl-12 py-3 bg-slate-50 border-slate-300 rounded-lg w-full md:w-[77%] focus:outline-none"
					></textarea>
					<img
						src={userProfileImg}
						alt="user"
						className="absolute top-40 w-5 h-5 left-3 opacity-70"
					/>
				</aside>
				<button className="w-full md:w-[77%] bg-slate-600 py-4 rounded-lg text-white font-bold tracking-wide">
					Save Changes
				</button>
			</form>
			{deviceWidth > 425 && (
				<aside className="w-[50%] flex-none">
					<img src={edit} alt="edit illustration" />
				</aside>
			)}
		</div>
	);
};

export default ProfileForm;
