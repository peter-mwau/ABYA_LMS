import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const CourseCard = ({ courses, baseUrl }) => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const handleNavigate = () => {
		user?.user_type === "Teacher"
			? navigate("/create-course/")
			: navigate("course-list");
	};

	return (
		<div className="md:grid md:grid-cols-3 gap-12 px-5 ">
			{courses.length ? (
				courses?.map((course) => (
					<div
						key={course.id}
						className="flex bg-gray-50 dark:bg-gray-800 dark:text-gray-200 md:block w-full mb-3 space-x-2 border rounded-xl overflow-hidden hover:shadow-gray-200 md:hover:shadow-lg md:hover:-translate-y-1 transition-all duration-300"
					>
						<section className="overflow-hidden rounded-tl-xl rounded-bl-xl w-2/5 md:w-full p-4">
							<img
								src={`${baseUrl}${course.picture}`}
								alt={course.course_name}
								className="w-full rounded-xl h-40 object-cover"
							/>
						</section>
						<section className="md:p-4 mt-5 md:mt-2 rounded-b-2xl md:w-full w-3/5">
							{/* <p className="text-gray-600 font-semibold text-sm">
								{course.students.length} students
							</p> */}
							<h2 className="text-lg font-semibold">{course.course_name}</h2>

							<p className="truncate text-gray-700 dark:text-gray-300 font-semibold">
								{course.course_description}
							</p>
							<p className="text-sm text-gray-500">
								course by {course.teacher_name}
							</p>
							<ul className="flex gap-1 pr-2 mt-4 md:mt-2 items-center justify-between">
								{user?.user_type === "Teacher" && (
									<li>
										<p className="text-sm text-gray-500 py-3 p-2">
											{course.teacher} enrolled
										</p>
									</li>
								)}
								<li>
									<button
										className="px-5 py-2 border rounded-full font-bold my-3 text-cyan-950 bg-gray-200"
										onClick={() =>
											user?.user_type === "Teacher" &&
											navigate("/update-course")
										}
									>
										{user.user_type === "Teacher" ? "Edit course" : "Enroll"}
									</button>
								</li>
							</ul>

							<Link to={`/course/${course.id}`} className="px-5 py-2 border rounded-full w-full md:w-1/3 my-3 bg-slate-400">
								View Course
							</Link>
						</section>
					</div>
				))
			) : (
				<div className="inline-block justify-center">
					<p>Oops! No courses at the moment</p>
					<button
						className="py-3 ml-7 px-6 border border-slate-500 rounded-md my-4"
						onClick={handleNavigate}
					>
						{user?.user_type === "Teacher" ? "Add course" : "View courses"}
					</button>
				</div>
			)}
		</div>
	);
};

export default CourseCard;
