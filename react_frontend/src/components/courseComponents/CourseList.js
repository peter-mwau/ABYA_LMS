import { useContext, useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { UserContext } from "../../contexts/userContext";

const CourseList = () => {
	const BASE_URL = process.env.REACT_APP_API_BASE_URL;
	const baseUrl = `${BASE_URL}/courses`;
	const url = `${BASE_URL}/courses/courses/list-courses`;
	const { user } = useContext(UserContext);
	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const userToken = localStorage.getItem("userToken");
				console.log(userToken);
				const response = await axios.get(url, {
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Token ${userToken}`,
					},
				});
				setCourses(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching courses:", error);
				setIsError(true);
				setIsLoading(false);
			}
		};

		fetchCourses();
	}, [url]);

	console.log(courses);

	return (
		<div className="dark:bg-gray-800 h-auto transition-all duration-1000">
			{ user.user_type === "Teacher" ?
				<h2 className="text-3xl font-semibold text-cyan-950 dark:text-white p-4">My Courses</h2>
				:
				<h2 className="text-3xl font-semibold text-cyan-950 dark:text-white p-4">Available Courses</h2>
			}
		<div className="md:ml-[33%] lg:ml-[19%] w-full md:w-[67%] lg:w-[80%] pt-10 md:px-0 h-auto">
			{user?.user_type === "Teacher" && (
				<div className="flex items-center md:fixed md:right-10 bottom-0 z-40 justify-center float-right mr-4 mb-4 lg:h-50">
					<a
						href="/Create-course"
						className="dark:bg-slate-500 dark:text-white bg-gray-200 text-cyan-950 hover:shadow-lg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
					>
						Add Course
					</a>
				</div>
			)}
			<CourseCard baseUrl={baseUrl} courses={courses || []} />
		</div>
		</div>
	);
};

export default CourseList;
