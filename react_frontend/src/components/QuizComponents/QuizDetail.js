import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
// import rightArrow from "../../images/right-arrow.png";
// import leftArrow from "../../images/left-arrow.png";
import checkIcon from "../../images/check.png";

const QuizDetail = () => {
	const BASE_URL =
		process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
	const { quizId } = useParams();
	const { user } = useContext(UserContext);
	const [quizData, setQuizData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState({});
	const [isAnswerSelected, setIsAnswerSelected] = useState(false);
	const [submissionResult, setSubmissionResult] = useState(null);
	const [warning, setWarning] = useState("");
	const [retryBlocked, setRetryBlocked] = useState(false);
	const [retryCooldown, setRetryCooldown] = useState(null);
	const [score, setScore] = useState(null);
	const [doneQuizes, setDoneQuizes] = useState([]);

	useEffect(() => {
		const fetchQuizData = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/assignments/fetch-quiz-data/${quizId}/`,
					{
						headers: {
							Authorization: `Token ${localStorage.getItem("userToken")}`,
						},
					}
				);
				setQuizData(response.data);
			} catch (error) {
				setError("Error fetching quiz data");
			} finally {
				setLoading(false);
			}
		};

		if (quizId) {
			fetchQuizData();
		}
	}, [quizId, BASE_URL]);
	const currentQuestion = quizData?.questions[currentQuestionIndex];

	useEffect(() => {
		if (retryBlocked && retryCooldown) {
			const intervalId = setInterval(() => {
				const now = new Date();
				const timeLeft = Math.max(0, Math.floor((retryCooldown - now) / 1000));
				if (timeLeft === 0) {
					setRetryBlocked(false);
					clearInterval(intervalId);
				}
			}, 1000);

			return () => clearInterval(intervalId);
		}
		// Quiz logic
	}, [retryBlocked, retryCooldown]);

	const handleAnswerChange = (questionId, choiceId) => {
		setAnswers({
			...answers,
			[questionId]: choiceId,
		});
		setIsAnswerSelected(true);
		setDoneQuizes((prevDoneQuizes) => [...prevDoneQuizes, questionId]);
	};

	console.log(doneQuizes);

	const handleNext = () => {
		if (currentQuestionIndex < quizData.questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);

			console.log(currentQuestion);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const handleSubmit = async () => {
		if (!window.confirm("Are you sure you want to submit your answers?")) {
			return;
		}

		const totalQuestions = quizData.questions.length;
		const correctAnswers = quizData.questions.filter((question) =>
			question.choices.find(
				(choice) => choice.id === answers[question.id] && choice.is_correct
			)
		).length;
		const calculatedScore = (correctAnswers / totalQuestions) * 100;
		setScore(calculatedScore);

		try {
			const response = await axios.post(
				`${BASE_URL}/assignments/quiz-submissions/submit/`,
				{
					student: user.id,
					quiz: quizId,
					score: calculatedScore,
				},
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				}
			);

			const data = response.data;
			if (data.detail === "You have one retry left before a 6-hour lockout.") {
				setWarning(data.detail);
				setRetryCooldown(new Date(new Date().getTime() + 6 * 60 * 60 * 1000)); // Set cooldown for 6 hours
			} else if (
				data.detail === "Retry limit reached. Please try again after 6 hours."
			) {
				setRetryBlocked(true);
				setRetryCooldown(new Date(new Date().getTime() + 6 * 60 * 60 * 1000)); // Set cooldown for 6 hours
			} else {
				setSubmissionResult(calculatedScore >= 75 ? "Pass" : "Fail");
			}
		} catch (error) {
			setError("Error submitting quiz");
		}
	};

	// console.log(doneQuizes.length);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!quizData || !quizData.questions || quizData.questions.length === 0)
		return <div>No quiz data available</div>;

	// const currentQuestion = quizData.questions[currentQuestionIndex];

	if (!currentQuestion) return <div>Invalid question index</div>;

	const formatTimeLeft = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hours}h ${minutes}m ${secs}s`;
	};

	console.log(quizData);
	return (
		<div className="md:flex relative md:space-x-4 dark:bg-gray-800 dark:text-gray-100 w-full mx-auto md:mx-0 md:w-[78%] md:ml-[20%] md:h-[78vh] mt-4">
			<div className="container overflow-x-hidden p-2 md:border md:border-gray-200 rounded-lg md:w-[60%] h-[100%]">
				<h1 className="font-bold p-3 bg-gray-100 md:w-[103%] md:-ml-2 -mt-2">
					Quiz Title: {quizData.quiz_title}
				</h1>
				{submissionResult ? (
					<div className="">
						<h2>{`Your score is: ${score}%`}</h2>
						<h2>{`Status: ${submissionResult}`}</h2>
						{warning && (
							<div className="alert alert-warning py-3 dark:text-yellow-400">
								{warning}
							</div>
						)}
						{retryBlocked && retryCooldown && (
							<div>
								<h3>
									Retry is blocked. Time left:{" "}
									{formatTimeLeft(
										Math.floor((retryCooldown - new Date()) / 1000)
									)}
								</h3>
							</div>
						)}
						{submissionResult === "Pass" && (
							<button
								className="p-2 dark:text-white rounded-lg mx-3 mt-[200px] dark:bg-yellow-400 font-semibold bg-gray-500 text-gray-100"
								onClick={() => window.location.reload()}
							>
								Continue
							</button>
						)}
						{!retryBlocked && (
							<button
								className="p-2 dark:bg-gray-300 rounded-lg dark:text-cyan-950 font-semibold bg-gray-500 text-gray-100"
								onClick={() => window.location.reload()}
							>
								Retry
							</button>
						)}
					</div>
				) : (
					<>
						<div key={currentQuestion?.id}>
							<h3 className="font-semibold italic ml-2 py-2">
								{currentQuestionIndex + 1}. {currentQuestion?.question_text}
							</h3>
							<ul>
								{currentQuestion?.choices.map((choice) => (
									<li
										key={choice.id}
										className="ml-4 my-3 p-2 rounded-lg w-[90%] md:w-3/4 bg-gray-50 border border-gray-50 has-[input:checked]:border-green-400 has-[input:checked]:border-3"
									>
										<label className="inline-flex items-center space-x-3 text-gray-600">
											<input
												type="radio"
												className="mx-2 checked:bg-orange-400"
												name={`question_${currentQuestion.id}`}
												value={choice.id}
												checked={answers[currentQuestion.id] === choice.id}
												onChange={() =>
													handleAnswerChange(currentQuestion.id, choice.id)
												}
											/>

											<p>{choice.text}</p>
										</label>
									</li>
								))}
							</ul>
						</div>
						<div className="flex space-x-3 ml-5 w-4/5 lg:w-1/3 absolute bottom-3">
							<button
								onClick={handlePrevious}
								disabled={currentQuestionIndex === 0}
								className={`${
									currentQuestionIndex === 0
										? "bg-gray-200 cursor-not-allowed"
										: "bg-gray-500"
								} py-2 px-4 w-1/3 rounded-lg dark:bg-gray-300 dark:border-gray-500 dark:text-cyan-950 font-semibold border-gray-500  text-gray-100`}
							>
								<p>previous</p>
							</button>

							{currentQuestionIndex < quizData.questions.length - 1 ? (
								<button
									onClick={handleNext}
									className="p-2 w-[50%] dark:bg-gray-300 dark:border-gray-500 rounded-lg dark:text-cyan-950 font-semibold border-gray-500 bg-gray-500 text-gray-100"
									disabled={!isAnswerSelected}
								>
									<p>next</p>
								</button>
							) : (
								<button
									onClick={handleSubmit}
									className="p-2 dark:bg-yellow-400 rounded-lg dark:text-white dark:hover:shadow-md dark:hover:shadow-white hover:cursor-pointer font-semibold bg-yellow-500 text-gray-200"
									disabled={!isAnswerSelected || retryBlocked}
								>
									submit quiz
								</button>
							)}
						</div>
					</>
				)}
			</div>
			<div className="h-[78vh] border-gray-200 rounded-lg md:w-[40%]">
				{quizData.questions?.map((question, index) => (
					<div
						className={`${
							doneQuizes.some((quiz) => quiz === question.id) && "bg-green-100"
						} bg-gray-50 p-3 rounded-lg mb-3 flex justify-between items-center`}
						key={index}
					>
						<p className="font-semibold text-gray-500 md:ml-3">
							Question {index + 1}
						</p>
						<img src={checkIcon} alt="checkIcon" className="w-5 h-5" />
						{/* <p className="px-2 rounded-full bg-slate-50 text-2xl items-center">
							_
						</p> */}
					</div>
				))}
			</div>
		</div>
	);
};

export default QuizDetail;
