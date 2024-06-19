import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";

const CourseCard = ({ courses, baseUrl }) => {
	const { user } = useContext(UserContext);
	return (
		<div className="md:grid md:grid-cols-3 gap-5 px-5">
			{courses.length ? (
				courses?.map((course) => (
					<div
						key={course.id}
						className="flex bg-gray-50 md:block w-full mb-3 space-x-2 border rounded-xl overflow-hidden hover:shadow-gray-200 md:hover:shadow-lg md:hover:-translate-y-2 transition-all duration-300"
					>
						<section className="overflow-hidden rounded-tl-xl rounded-bl-xl w-2/5 md:w-full p-2">
							<img
								src={`${baseUrl}${course.picture}`}
								alt={course.course_name}
								className="w-full rounded-xl h-40 object-cover"
							/>
						</section>
						<section className="p-4 mt-2 md:p-2 rounded-b-2xl md:w-full w-3/5">
							<p className="text-gray-600 font-semibold text-sm">
								{course.students.length} students
							</p>
							<h2 className="text-lg font-semibold">{course.course_name}</h2>
							<p className="truncate">{course.course_description}</p>
							<button className="px-5 py-2 border rounded-full w-full md:w-1/3 my-3 bg-slate-400">
								{user.user_type === "Teacher" ? "Edit course" : "Enroll"}
							</button>
						</section>
					</div>
				))
			) : (
				<p>Oops! No courses at the moment</p>
			)}
		</div>
	);
};

export default CourseCard;
