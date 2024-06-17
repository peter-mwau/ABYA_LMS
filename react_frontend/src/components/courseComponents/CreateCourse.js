import { createContext, useState } from "react";
import CourseForm from "./CourseForm";
import LessonForm from "./LessonForm";
import ChapterForm from "./ChapterForm";

export const CourseContext = createContext();

const CreateCourse = () => {
	const [pageId, setPageId] = useState([1]);
	const [course, setCourse] = useState({});
	const [formData, setFormData] = useState({
		course_name: "",
		course_description: "",
		picture: null,
	});

	const handleNext = () => {
		setPageId((prevPageId) => {
			const nums = [...prevPageId];
			nums.push(prevPageId.length + 1);
			return nums;
		});
	};

	const steps = [
		{
			id: 1,
			name: "STEP 1",
			title: "CREATE COURSE",
		},
		{
			id: 2,
			name: "STEP 2",
			title: "CREATE CHAPTER",
		},
		{
			id: 3,
			name: "STEP 3",
			title: "CREATE LESSON",
		},
	];
	return (
		<CourseContext.Provider value={{ course, setCourse }}>
			<div className="md:flex space-x-10 md:ml-[20%] mt-4 md:w-[78%] h-[75vh] relative">
				<div
					id="sidebackground"
					className="w-[30%] h-full bg-cover rounded-xl p-10 bg-opacity-20"
				>
					<ul>
						{steps.map((step, index) => (
							<li
								key={step.id}
								className="md:flex space-x-7 items-center font-bold even:my-16"
							>
								<p
									className={`${
										pageId[index] === step.id && "bg-yellow-50"
									} px-4 py-2 border rounded-full text-center`}
								>
									{step.id}
								</p>
								<aside>
									<p className="text-slate-100">{step.name}</p>
									<p className="text-slate-800">{step.title}</p>
								</aside>
							</li>
						))}
					</ul>
					<button
						className="absolute bottom-5 right-16 text-black bg-gray-300 hover:bg-slate-600 transition-all duration-300 px-8 py-3 rounded-lg font-semibold tracking-wide hover:text-white"
						onClick={handleNext}
					>
						Next Step
					</button>
				</div>
				<div className="p-10 w-[70%]">
					{pageId.length === 1 && (
						<CourseForm
							step={steps[0]}
							formData={formData}
							setFormData={setFormData}
						/>
					)}
					{pageId.length === 2 && <ChapterForm />}
					{pageId.length === 3 && (
						<LessonForm courseName={formData?.course_name || ""} />
					)}
				</div>
			</div>
		</CourseContext.Provider>
	);
};

export default CreateCourse;
