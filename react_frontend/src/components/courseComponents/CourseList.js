import useFetch from "../../hooks/useFetch";

import CourseCard from "./CourseCard";

const CourseList = () => {
	const baseUrl = "http://localhost:8000/courses";
	const url = `${baseUrl}/courses/list-courses`;

	const { courses, isLoading, isError } = useFetch(url);
	console.log(courses);
	return (
		<div className="md:ml-[18%] w-full md:w-[80%] mt-5  md:px-0">
			<CourseCard baseUrl={baseUrl} courses={courses || []} />
			<div className="flex items-center justify-center my-auto mx-auto lg:h-50">
				<a
					href="/Create-course"
					className="dark:bg-slate-500 dark:text-white bg-gray-200 text-cyan-950 hover:shadow-lg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
				>
					Add Course
				</a>
			</div>
		</div>
	);
};

export default CourseList;
