import { useEffect, useState, useRef } from "react";
import illustration from "../images/illustration.jpg";
import userImg from "../images/user.png";
import userProfileImg from "../images/profile.png";
import axios from "axios";
import mail from "../images/mail.png";

const ProfileForm = ({ user, isOpen, setIsOpen }) => {
	const BASE_URL = process.env.REACT_APP_API_BASE_URL;
	const [userDetails, setUserDetails] = useState(user);
	const baseUrl = `${BASE_URL}/users`;
	const [image, setImage] = useState(null);

	const modalRef = useRef();

	useEffect(() => {
		user && setUserDetails(user);
	}, [user]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(URL.createObjectURL(file));

		file && setUserDetails({ ...userDetails, avatar: file });
	};

	const handleSubmit = async (e) => {
		const userToken = localStorage.getItem("userToken");
		const formData = new FormData();

		for (const key in userDetails) {
			formData.append(key, userDetails[key]);
		}

		if (userDetails && userDetails.avatar instanceof File) {
			formData.append("avatar", userDetails.avatar);
		}
		for (const value of formData.values()) {
			console.log(value);
		}

		try {
			const response = await axios.put(
				`${BASE_URL}/users/profile/`,
				formData,
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			console.log(response.status);
			// navigate("profile/");
			setUserDetails(response.data);
		} catch (error) {
			console.error("Failed to update user data:", error);
		}
	};

	useEffect(() => {
		isOpen && modalRef.current.showModal();
	}, [isOpen, modalRef]);

	const handleClose = (e) => {
		const dimensions = modalRef.current.getBoundingClientRect();
		if (
			e.clientX < dimensions.left ||
			e.clientX > dimensions.right ||
			e.clientY < dimensions.top ||
			e.clientY > dimensions.bottom
		) {
			setIsOpen(false);
			modalRef.current.close();
		}
	};

	return (
		<dialog
			ref={modalRef}
			onClick={handleClose}
			className="w-full md:w-1/3 rounded-2xl px-5 max-w-[50ch] backdrop:opacity-50 backdrop:bg-black -mb-4 md:mb-auto pb-10"
		>
			<form className="w-full rounded-lg mt-4 p-5" onSubmit={handleSubmit}>
				<aside className="flex items-center justify-between space-x-20 md:space-x-14">
					<img
						src={
							image
								? image
								: user?.avatar
								? `${baseUrl}${user.avatar}`
								: illustration
						}
						alt="illustration"
						className="w-20 h-20 lg:w-24 lg:h-24 md:w-32 md:h-32 rounded-full"
					/>
					<label className="cursor-pointer tracking-wide bg-slate-100 text-base font-semibold px-3 md:px-10 lg:px-16 py-4 rounded-lg">
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
						className="pl-12 py-4 w-full bg-slate-50 border-slate-300 rounded-lg focus:outline-slate-300"
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
						className="pl-12 mt-4 py-4 w-full bg-slate-50 border-slate-300 rounded-lg focus:outline-slate-300"
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
						className="resize-none my-3 pl-12 py-3 bg-slate-50 border-slate-300 rounded-lg w-full focus:outline-none"
						onChange={handleInputChange}
					></textarea>
					<img
						src={userProfileImg}
						alt="user"
						className="absolute top-40 w-5 h-5 left-3 opacity-70"
					/>
				</aside>
				<button className="w-full bg-slate-500 py-4 rounded-lg text-white font-bold tracking-wide">
					Save Changes
				</button>
			</form>
		</dialog>
	);
};

export default ProfileForm;
