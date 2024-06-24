import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import editIcon from "../../images/editIcon.png";

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
						<section className="md:p-4 mt-2 md:w-full w-3/5">
							{user?.user_type === "Teacher" && (
								<p className="text-sm text-gray-500 py-3 p-2">
									{course.teacher} enrolled
								</p>
							)}
							<h2 className="text-lg font-semibold">{course.course_name}</h2>

							<p className="truncate text-gray-700 dark:text-gray-300 font-semibold">
								{course.course_description}
							</p>
							<p className="text-sm text-gray-500">
								course by {course.teacher_name}
							</p>
							<ul className="flex gap-1 pr-2 mt-4 md:my-4 md:mt-5 items-center justify-between">
								<li>
									<Link
										to={`/course-info/${course.id}`}
										className="px-7 py-2 border font-semibold text-cyan-950 rounded-full w-full md:w-1/3 my-3 bg-gray-200"
									>
										view
									</Link>
								</li>
								{user.user_type === "Teacher" && (
									<li>
										<Link to="/update-course">
											<img
												src={editIcon}
												alt="edit"
												className="w-7 h-7 opacity-60"
											/>
										</Link>
									</li>
								)}
							</ul>
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
						{user?.user_type === "Teacher" ? "Add course" : "view"}
					</button>
				</div>
			)}
		</div>
	);
};

export default CourseCard;
