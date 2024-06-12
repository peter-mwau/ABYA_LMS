import { useEffect, useState } from "react";
import illustration from "../images/illustration.jpg";
import userImg from "../images/user.png";
import userProfileImg from "../images/profile.png";

const ProfileForm = ({ user }) => {
	const [userDetails, setUserDetails] = useState(user);
	const [userProfile, updateProfile] = useState(null);
	const baseUrl = "http://localhost:8000/users";

	useEffect(() => {
		if (user) {
			setUserDetails(user);
		}
	}, [user]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name in userDetails) {
			setUserDetails({
				...userDetails,
				[name]: value,
			});
		} else if (userProfile && name in userProfile) {
			updateProfile({
				...userProfile,
				[name]: value,
			});
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			updateProfile({
				...userProfile,
				avatar: file,
			});
		}
	};

	console.log(userDetails.avatar);

	return (
		<form className="w-2/4 md:ml-[20%] rounded-lg mt-4">
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
					<input type="file" className="hidden" onChange={handleImageChange} />
				</label>
			</aside>
			<aside className="my-4 relative mt-10">
				<input
					className="pl-12 py-4 w-[65%] bg-slate-50 border-slate-300 rounded-lg focus:outline-slate-300"
					type="text"
					placeholder="username or email"
					name="firstname"
					// value={userDetails?.firstname || ""}
					onChange={handleInputChange}
				/>
				<img
					src={userImg}
					alt="user"
					className="absolute top-5 left-3 w-5 h-5 opacity-70 "
				/>
				<textarea
					// cols={3}
					rows={3}
					placeholder="Short bio..."
					className="resize-none my-3 pl-12 py-3 bg-slate-50 border-slate-300 rounded-lg w-[65%] focus:outline-none"
				></textarea>
				<img
					src={userProfileImg}
					alt="user"
					className="absolute top-20 w-5 h-5 left-3 opacity-70"
				/>
			</aside>
			<button className="w-[65%] bg-slate-800 py-4 rounded-lg text-white text-semibold">
				Save Changes
			</button>
		</form>
	);
};

export default ProfileForm;
