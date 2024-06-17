import CourseForm from "./CourseForm";

const CreateCourse = () => {
	return (
		// This is a nultistep form
		<div className="md:ml-[20%] w-[75%] border flex space-x-10">
			<div className="h-[60vh] w-1/4 border bg-gray-50">
				lorem ipsum dolor sit amet, consectetur adip inc commodo sit amet et
			</div>
			<section>
				<CourseForm />
			</section>
		</div>
	);
};

export default CreateCourse;
