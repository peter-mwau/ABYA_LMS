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
		</div>
	);
};

export default CourseList;
