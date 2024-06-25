import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import left_arrows from "../../images/left-arrows.png";
import add from "../../images/add.png";
import { useNavigate } from "react-router-dom";
import { quizContext } from "../../App";
import deleteIcon from "../../images/delete.png";

function QuestionForm() {
	const [quizTitle, setQuizTitle] = useState("");
	const [questionText, setQuestionText] = useState("");
	const [choices, setChoices] = useState(
		Array.from({ length: 4 }, () => ({ text: "", isCorrect: false }))
	);
	const [multipleCorrect, setMultipleCorrect] = useState(false);
	const [quizzes, setQuizzes] = useState([]);
	const [questionCount, setQuestionCount] = useState(1);
	const navigate = useNavigate();
	const { quiz, setQuiz } = useContext(quizContext);
	console.log("Quiz:", [quiz]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const questionData = {
			quiz_title: quiz.quiz_title,
			question_text: questionText,
			choices: choices,
			course: quiz.course,
			chapter: quiz.chapter,
			quiz_description: "hi",
		};

		try {
			const response = await axios.post(
				"http://localhost:8000/assignments/quiz/create-quiz/",
				questionData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				}
			);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	function handleChoiceChange(index, field, value) {
		setQuiz({
			...quiz,
			[field]: value,
		});
		setChoices((prevChoices) => {
			return prevChoices.map((choice, i) => {
				if (i === index) {
					return { ...choice, [field]: value };
				} else if (field === "isCorrect" && !multipleCorrect) {
					return { ...choice, isCorrect: false };
				} else {
					return choice;
				}
			});
		});
	}

	const addChoice = () => {
		setChoices([...choices, { text: "", isCorrect: false }]);
	};

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/assignments/quiz/",
					{
						headers: {
							Authorization: `Token ${localStorage.getItem("userToken")}`,
						},
					}
				);
				const quizTitles = response.data.map((quiz) => quiz.quiz_title);
				setQuizzes(quizTitles);
				console.log("Quiz Titles: ", quizTitles);
			} catch (error) {
				console.error(error);
			}
		};

		fetchQuizzes();
	}, []);

	return (
		<div className="md:ml-[20%] mt-4 md:flex md:space-x-5 md:w-[78%] md:mr-[50px] text-cyan-950 dark:bg-gray-900">
			{/* Left side of questions for creation */}
			<div className="md:w-3/5 border rounded-lg p-2">
				<section className="flex justify-between items-center p-3">
					<aside className="flex space-x-6 items-center">
						<button onClick={() => navigate(-1)}>
							<img
								src={left_arrows}
								className="w-7 h-7 opacity-30"
								alt="left"
							/>
						</button>
						<p className="font-semibold text-lg">Questions</p>
					</aside>
					<img
						src={add}
						className="w-7 h-7 opacity-30 cursor-pointer"
						alt="left"
						onClick={() => setQuestionCount(questionCount + 1)}
					/>
				</section>

				<form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 ">
					{/* Question flex container */}
					<aside className="flex space-x-3 items-center md:w-4/5">
						<p className="font-semibold text-lg">{questionCount}.</p>
						<input
							type="text"
							onChange={(e) => setQuestionText(e.target.value)}
							className="bg-gray-100 appearance-none border-none rounded dark:bg-gray-700 dark:text-gray-50 w-full p-3 text-gray-700 font-semibold leading-tight focus:outline-none focus:shadow-outline"
						/>
					</aside>

					{/* Options for the Questions */}
					<div className="mt-5">
						<p className="font-semibold text-lg my-3">Options</p>
						{choices.map((choice, index) => (
							<div
								key={index}
								className="my-5 space-x-3 flex items-center md:w-4/5"
							>
								<input
									type="checkbox"
									className="gap-2 w-6 h-6 checked:bg-green-300 checked:outline-none bg-gray-100 rounded-sm mx-2"
									checked={choice.isCorrect}
									onChange={(e) =>
										handleChoiceChange(index, "isCorrect", e.target.checked)
									}
								/>
								<input
									type="text"
									className={`${
										choice.isCorrect && "bg-green-300 text-white"
									} bg-gray-100 text-gray-700 appearance-none border-none rounded w-full p-3 font-semibold`}
									value={choice.text}
									onChange={(e) =>
										handleChoiceChange(index, "text", e.target.value)
									}
								/>
							</div>
						))}
					</div>

					<button
						type="submit"
						className="bg-cyan-950 float-right my-6 dark:bg-gray-300 dark:text-cyan-950 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
					>
						Add Question
					</button>
				</form>
			</div>
			{/* Right side of questions for preview */}
			<div className="md:w-2/5 bg-white rounded-lg border p-4">
				<p className="font-semibold text-lg mb-5">Edit/Delete questions</p>
				{[quiz]?.map((quiz) => (
					<div key={quiz.quiz_title} className="flex space-x-3  items-center">
						<p className="flex-1">{quiz.quiz_title}</p>
						<button>
							<img
								src={deleteIcon}
								className="w-6 h-6 opacity-40"
								alt="delete"
							/>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default QuestionForm;
