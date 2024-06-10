import React, { useState, useEffect } from "react";
import axios from "axios";

// import "flowbite";

function Homepage() {
	// const [username, setUsername] = useState('');
	const [isSideNavOpen, setIsSideNavOpen] = useState(false);
	const userToken = localStorage.getItem("userToken");

	const [courses, setCourses] = useState([]);
	//    const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const userToken = localStorage.getItem("userToken");
				const response = await axios.get("http://localhost:8000/courses/", {
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
		<div>
			<button
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				onClick={toggleSidenav}
				class="inline-flex absolute items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
	);
}

export default Homepage;
