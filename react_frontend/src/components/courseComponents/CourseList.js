import { useContext } from "react";
import useFetch from "../../hooks/useFetch";

import CourseCard from "./CourseCard";
import { UserContext } from "../../contexts/userContext";

const CourseList = () => {
	const baseUrl = "http://localhost:8000/courses";
	const url = `${baseUrl}/courses/list-courses`;
	const { user } = useContext(UserContext);

	const { courses, isLoading, isError } = useFetch(url);
	console.log(courses);
	return (
		<div className="md:ml-[18%] w-full md:w-[80%] mt-5 md:px-0">
			{user?.user_type === "Teacher" && (
				<div className="flex items-center justify-center float-right mr-4 mb-4 lg:h-50">
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
	);
};

export default CourseList;
