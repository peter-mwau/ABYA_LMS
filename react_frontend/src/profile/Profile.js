import React, { useContext, useState } from "react";
import illustration from "../images/illustration.jpg";
import background from "../images/background.jpg";
import ProfileForm from "./ProfileForm";
import { UserContext } from "../contexts/userContext";

const Profile = () => {
	const { user } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);

	if (!user) {
		return <div>Loading...</div>;
	}
	const baseUrl = "http://localhost:8000/users";

	return (
		<>
			{isEditing ? (
				<ProfileForm user={user} setIsEditing={setIsEditing} />
			) : (
				<div className="md:border rounded-xl mt-4 md:overflow-y-hidden relative md:ml-[20%] w-full md:w-[78%] bg-transparent md:h-[80vh] text-cyan-900">
					<img
						src={background}
						alt="bg"
						className="h-[60%] w-full -mt-40 -z-10 relative opacity-80 rounded-t-xl"
					/>
					<div className="px-10">
						{/* user profile photo */}
						<img
							src={
								user && user.avatar ? `${baseUrl}${user.avatar}` : illustration
							}
							alt="avatar"
							className="w-28 h-28 -mt-16 rounded-full ring-4 ring-white"
						/>
						<aside className="flex justify-between items-center mt-4">
							<section>
								<p className="font-bold text-black text-2xl capitalize">
									{user?.firstname} {user?.lastname}
								</p>
								<p className="font-medium text-slate-700">@{user?.username}</p>
								<p className="font-medium">{user?.email}</p>
							</section>
							<p className="text-sm text-black font-bold py-2 px-6 md:px-12 bg-slate-100 rounded-2xl">
								{user.user_type}
							</p>
						</aside>
						<section className="flex space-x-4 md:justify-normal justify-between my-4">
							<button
								className="bg-slate-600 px-8 py-2 text-white rounded-3xl"
								onClick={() => setIsEditing(true)}
							>
								Edit Profile
							</button>
							<button className="px-6 py-2 text-black font-semibold border-2 rounded-3xl border-slate-800">
								Settings
							</button>
						</section>
						<aside className="md:flex justify-between items-center md:space-x-3 mt-8">
							<div className="bg-slate-100 flex-1 rounded-xl p-4">
								<h3 className="font-semibold text-lg text-black">Bio</h3>
								<p className="text-black my-2">
									{typeof user.bio === typeof "null"
										? user.bio
										: "Oops! No bio yet"}
								</p>
							</div>
							<div className="bg-slate-100 flex-1 rounded-xl p-4 my-2">
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
						</aside>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
