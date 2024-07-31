import React, { useContext, useState, useRef } from "react";
import illustration from "../images/illustration.jpg";
import background from "../images/sidebg.jpg";
import ProfileForm from "./ProfileForm";
import { UserContext } from "../contexts/userContext";
import WalletBox from "./WalletBox";

const Profile = () => {
	const { user } = useContext(UserContext);
	const [isOpen, setIsOpen] = useState(false);

	if (!user) {
		return <div>Loading...</div>;
	}
	const baseUrl = "http://localhost:8000/users";

	return (
		<>
			<ProfileForm user={user} isOpen={isOpen} setIsOpen={setIsOpen} />

			<div className="md:border rounded-xl mt-4 md:overflow-y-hidden relative md:ml-[35%] lg:ml-[20%] md:w-[63%] lg:w-[78%] w-full bg-transparent md:h-[80vh] text-cyan-900 ">
				<img
					src={background}
					alt="bg"
					className="h-[60%] w-full -mt-56 lg:-mt-40 -z-10 relative opacity-40 rounded-t-3xl"
				/>
				<div className="px-10">
					{/* user profile photo */}
					<img
						src={
							user && user.avatar ? `${baseUrl}${user.avatar}` : illustration
						}
						alt="avatar"
						className="w-24 h-24 lg:w-28 lg:h-28 -mt-14 lg:-mt-16 rounded-full ring-4 lg:ring-8 ring-white"
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
					<section className="flex space-x-4 text-sm  lg:justify-normal justify-between my-4">
						<button
							className="bg-slate-500 px-8 py-2 text-white rounded-3xl"
							onClick={() => {
								setIsOpen(true);
								console.log("Hello world");
							}}
						>
							Edit Profile
						</button>
						<button className="px-6 py-2 text-black lg:font-semibold border-2 rounded-3xl border-slate-800">
							Settings
						</button>
					</section>
					<aside className="lg:flex w-full justify-between items-center space-y-3 lg:space-x-4">
						<div className="bg-slate-100 lg:w-2/5 rounded-xl p-4">
							<h3 className="font-semibold text-lg text-black">Bio</h3>
							<p className="text-black my-2">
								{typeof user.bio === typeof "null"
									? user.bio
									: "Oops! No bio yet"}
							</p>
						</div>
						{/* <div className="bg-slate-100 flex-1 rounded-xl p-4 my-2">
								<h3 className="font-semibold text-lg text-black">
									Ready to {user?.user_type === "Student" ? "learn" : "teach"}
								</h3>
								<p className="text-black my-2">
									{user?.user_type === "Student"
										? "Enroll in courses you're interested in."
										: "Upload courses for students."}
								</p>
							</div> */}

						{/* <div className="bg-slate-100 flex-1 rounded-xl p-4">
								<h3 className="font-semibold text-lg text-black">Update</h3>
								<p className="text-black my-2">Keep your profile updated</p>
							</div> */}
						<WalletBox />
					</aside>
				</div>
			</div>
		</>
	);
};

export default Profile;
