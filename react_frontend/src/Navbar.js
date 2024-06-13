import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import illustration from "./images/illustration.jpg";
import { UserContext } from './contexts/userContext';


function Navbar() {
    // const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const baseUrl = 'http://localhost:8000/users';

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}
	}, [darkMode]);


	if (isLoading) {
		return <div>Loading...</div>;
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const logout = async (event) => {
		event.preventDefault();
		try {
			// Retrieve the token from local storage
			const userToken = localStorage.getItem("userToken");
			console.log("useToken: ", userToken);
			const response = await axios.post(
				"http://localhost:8000/users/logout/",
				null,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${userToken}`,
					},
				}
			);

			console.log(response.data);
			if (response.status === 200) {
				// Remove the token from local storage
				localStorage.removeItem("userToken");
				navigate("/login");
			} else {
				console.error("Logout failed:", response.data);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<nav class="bg-gray-50 border-gray-200 dark:bg-gray-900">
			<div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
				<a
					href="https://flowbite.com/"
					class="flex items-center space-x-3 rtl:space-x-reverse md:w-[200px]"
				>
					<img
						width="250"
						height="250"
						src="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png"
						class="attachment-large size-large wp-image-3255"
						alt=""
						loading="lazy"
						srcset="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png 350w, https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo-300x129.png 300w"
						sizes="(max-width: 592px) 100vw, 592px"
					/>
				</a>
				<div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse flex-col">
					<button
						type="button"
						onClick={toggleDropdown}
						class="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
						id="user-menu-button"
						aria-expanded="false"
						data-dropdown-toggle="user-dropdown"
						data-dropdown-placement="bottom"
					>
						<span class="sr-only">Open user menu</span>
						{/* <img class="w-8 h-8 rounded-full hidden md:flex lg:flex" src="/profile-picture-3.jpg" alt="user photo" /> */}
						<img
							class="w-12 h-12 rounded-full"
							src={
								user && user.avatar ? `${baseUrl}${user.avatar}` : illustration
							}
							alt="userAvatar"
						/>
					</button>
					{/* <!-- Dropdown menu --> */}
					<div
						className={`py-2 space-y-2 ${
							isDropdownOpen ? "" : "hidden"
						} z-50 my-4 absolute right-3 mt-[60px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown`}
					>
						<div class="px-4 py-3">
							<span class="block text-sm text-gray-900 dark:text-white">
								@{user?.username}
							</span>
							<span class="block text-sm  text-gray-500 truncate dark:text-gray-400">
								{user?.email}
							</span>
						</div>
						<ul class="py-2" aria-labelledby="user-menu-button">
							<li>
								<a
									href="/dashboard"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Dashboard
								</a>
							</li>
							<li>
								<a
									href="/profile"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Profile
								</a>
							</li>
							<li>
								<a
									href="#me"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Settings
								</a>
							</li>
							<li>
								<a
									href="#me"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Earnings
								</a>
							</li>
							<li>
								<button
									onClick={logout}
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Sign out
								</button>
							</li>
						</ul>
					</div>
					<button
						data-collapse-toggle="navbar-user"
						type="button"
						class="inline-flex absolute items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-user"
						aria-expanded="false"
					>
						<span class="sr-only">Open main menu</span>
						<svg
							class="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
				</div>
				<div
					class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-user"
				>
					<ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<a
								href="/dashboard"
								class="block py-2 px-3 text-white hover:underline rounded md:bg-transparent md:text-yellow-500 md:p-0 md:dark:text-yellow-400"
								aria-current="page"
							>
								Dashboard
							</a>
						</li>
						<li>
							<a
								href="/profile"
								class="flex lg:hidden md:hidden py-2 px-3 text-cyan-950 hover:text-yellow-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 dark:text-white md:dark:hover:text-yellow-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Profile
							</a>
						</li>
						<li>
							<a
								href="#me"
								class="block py-2 px-3 text-cyan-950 hover:text-yellow-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 dark:text-white md:dark:hover:text-yellow-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Enrolled Courses
							</a>
						</li>
						<li>
							<a
								href="#me"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 dark:text-white md:dark:hover:text-yellow-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Library
							</a>
						</li>
						<li>
							<a
								href="#me"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 dark:text-white md:dark:hover:text-yellow-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Pricing
							</a>
						</li>
						<li>
							<a
								href="#me"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 dark:text-white md:dark:hover:text-yellow-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Contact
							</a>
						</li>
						<a href="#me" className="lg:pl-10 p-2">
							<svg
								class="w-6 h-6 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
							</svg>
						</a>
						{/* togglemode btn */}
						<a
							href="#me"
							className="hover:bg-gray-400 hover:rounded-full p-2"
							onClick={() => setDarkMode(!darkMode)}
						>
							<svg
								class="w-6 h-6 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-2a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
								/>
								<path d="M10 12a2 2 0 0 0 0-4V6a4 4 0 0 1 0 8v-2Z" />
							</svg>
						</a>
					</ul>
				</div>
			</div>
		</nav>
	);
}
export default Navbar;
