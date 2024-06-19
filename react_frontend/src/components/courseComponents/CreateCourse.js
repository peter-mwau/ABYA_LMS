import { createContext, useState } from "react";
import CourseForm from "./CourseForm";
import LessonForm from "./LessonForm";
import ChapterForm from "./ChapterForm";
import { useNavigate } from 'react-router-dom';

export const CourseContext = createContext();

const CreateCourse = () => {
	const [pageId, setPageId] = useState([1]);
	const [course, setCourse] = useState({});
	const [isEmpty, setIsEmpty] = useState(false);
	const [chapterCount, setChapterCount] = useState(1);
	const [lessonCount, setLessonCount] = useState(1);
	const [error, setErrors] = useState('');
	const navigate = useNavigate();
	const [successMessage, setSuccessMessage] = useState('');

	const [formData, setFormData] = useState({
		course_name: "",
		course_description: "",
		picture: null,
	});


	const handleSubmit = async (event) => {
		event.preventDefault();
	
		// Code to create the course...
	
		// After the course is successfully created:
		const courseName = formData.course_name; // Save the course name
		setFormData({
			course_name: "",
			course_description: "",
			picture: null,
		});
		setErrors({});
		setSuccessMessage(`${courseName} created successfully`); // Use the saved course name
	
		// Navigate to the dashboard
		navigate('/Course-list');
	};

	// const handlePrevious = () => {
	// 	setPageId(pageId.slice(0, -1));
	// };

	const handleNext = () => {
		setPageId((prevPageId) => {
			const nums = [...prevPageId];
			nums.push(prevPageId.length + 1);
			return nums;
		});
	};

	const handlePrevious = () => {
		setPageId((prevPageId) => {
			const nums = [...prevPageId];
			nums.pop(prevPageId.length);
			return nums;
		});
	};

	const viewPort = window.innerWidth;

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
			<div className="md:flex -mt-1 md:space-x-10 md:ml-[20%] md:mt-4 md:w-[78%] h-[75vh] relative">
				<div
					id="sidebackground"
					className="md:w-[30%] md:h-full bg-cover md:rounded-xl p-10 bg-opacity-20"
				>
					<ul className="flex md:block items-center space-x-4 md:space-x-0 justify-between">
						{steps.map((step, index) => (
							<li
								key={step.id}
								className="md:flex md:space-x-7 items-center font-bold md:even:my-16"
							>
								<p
									className={`${
										pageId[index] === step.id && "bg-yellow-50"
									} px-4 py-2 mb-2 md:w-auto border rounded-full text-center`}
								>
									{step.id}
								</p>
								<aside>
									<p className="text-slate-100">{step.name}</p>
									{viewPort > 425 && (
										<p className="text-slate-800">{step.title}</p>
									)}
								</aside>
							</li>
						))}
					</ul>

					
					{/* <div className="flex justify-between items-center mt-10 lg:absolute lg
					bottom-5 lg:right-16 lg:gap-2">
    					{pageId.length > 1 && (
        				<button
            				className=" text-black bg-gray-300 hover:bg-slate-600 transition-all duration-300 px-8 py-3 rounded-lg font-semibold tracking-wide hover:text-white"
            				onClick={handlePrevious}>
            				Previous Step
        				</button>
    					)}
    					{pageId.length < 3 ? (
    						<button
        						className=" text-black bg-gray-300 hover:bg-slate-600 transition-all duration-300 px-8 py-3 rounded-lg font-semibold tracking-wide hover:text-white"
        						onClick={handleNext}>
        						Next Step
    						</button>
							) : (
    						<button
        						className=" text-black bg-gray-300 hover:bg-slate-600 transition-all duration-300 px-8 py-3 rounded-lg font-semibold tracking-wide hover:text-white"
        						onClick={handleSubmit}>
        						Submit
    						</button>
							)}
					</div> */}
				</div>
				<div className="p-10 md:w-[70%]">
					{pageId.length === 1 && (
						<CourseForm
							step={steps[0]}
							formData={formData}
							setFormData={setFormData}
							handleNext={handleNext}
						/>
					)}
					{pageId.length === 2 && (
						<ChapterForm
							chapterCount={chapterCount}
							setChapterCount={setChapterCount}
							courseName={formData?.course_name || ""}
						/>
					)}
					{pageId.length === 3 && (
						<LessonForm
							courseName={formData?.course_name || ""}
							lessonCount={lessonCount}
							setLessonCount={setLessonCount}
						/>
					)}
				</div>
				<ul className="flex justify-between mx-3 mb-2">
					<li>
						{pageId.length > 1 && (
							<button
								className="md:absolute bottom-5 md:left-[36%] text-black border border-slate-600 hover:bg-slate-600 transition-all duration-300 px-8 py-2 md:py-3 rounded-lg font-semibold tracking-wide hover:text-white"
								onClick={handlePrevious}
							>
								Previous
							</button>
						)}
					</li>
					<li>
						<button
							className="md:absolute bottom-5 right-16 text-black bg-gray-300 hover:bg-slate-600 transition-all duration-300 px-8 py-2 md:py-3 rounded-lg font-semibold tracking-wide hover:text-white"
							onClick={pageId.length === 3 ? handleSubmit : handleNext}
						>
							{pageId.length < 3 ? "Next Step" : "Finish"}
						</button>
					</li>
				</ul>
			</div>
		</CourseContext.Provider>
	);
};

export default CreateCourse;
