import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from '../src/contexts/userContext';

// import "flowbite";

function Homepage() {
	const BASE_URL = process.env.REACT_APP_API_BASE_URL;
	// const [username, setUsername] = useState('');
	const [isSideNavOpen, setIsSideNavOpen] = useState(false);
	const userToken = localStorage.getItem("userToken");
	const { user } = useContext(UserContext);

	const [courses, setCourses] = useState([]);
	//    const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const userToken = localStorage.getItem("userToken");
				const response = await axios.get(`${BASE_URL}/courses/`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
				});
				setCourses(response.data);
				console.log("Response:", response);
				console.log("User_Token:", userToken);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchCourses();
	}, [userToken]);

	const toggleSidenav = () => {
		setIsSideNavOpen(!isSideNavOpen);
	};

	function handleSideNavButtonClick() {
		setIsSideNavOpen(!isSideNavOpen);
	}

	return (
		<>
		<div className="dark:bg-gray-800">
		<h2 className="text-3xl font-semibold text-cyan-950 pt-[20px] dark:text-white">Welcome Back, <span className="text-yellow-400">{user.username}!</span></h2>
		<main className="p-4 md:ml-64 h-auto pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"
        ></div>
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
        ></div>
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
        ></div>
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
        ></div>
      </div>
      <div
        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
      ></div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
      </div>
      <div
        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
      ></div>
      <div className="grid grid-cols-2 gap-4">
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
      </div>
    </main>
		<div>
			<button
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				onClick={toggleSidenav}
				className="inline-flex absolute items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			>
				<span class="sr-only">Open sidebar</span>
				<svg
					class="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						fill-rule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>
		</div>
		</div>
		</>
	);
}

export default Homepage;
