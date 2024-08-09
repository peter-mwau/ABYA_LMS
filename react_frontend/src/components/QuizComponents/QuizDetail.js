import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';

const QuizDetail = () => {
  const { quizId } = useParams();
  const { user } = useContext(UserContext);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [warning, setWarning] = useState('');
  const [retryBlocked, setRetryBlocked] = useState(false);
  const [retryCooldown, setRetryCooldown] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/assignments/fetch-quiz-data/${quizId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('userToken')}`,
          },
        });
        setQuizData(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Error fetching quiz data');
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId]);

  useEffect(() => {
    // If retryBlocked is true, start the countdown
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
  }, [retryBlocked, retryCooldown]);

  const handleAnswerChange = (questionId, choiceId) => {
    setAnswers({
      ...answers,
      [questionId]: choiceId,
    });
    setIsAnswerSelected(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerSelected(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswerSelected(false);
    }
  };

  const handleSubmit = async () => {
    const totalQuestions = quizData.questions.length;
    const correctAnswers = quizData.questions.filter(
      (question) => question.choices.find((choice) => choice.id === answers[question.id] && choice.is_correct)
    ).length;
    const calculatedScore = (correctAnswers / totalQuestions) * 100;
    setScore(calculatedScore);

    try {
      const response = await axios.post(
        'http://localhost:8000/assignments/quiz-submissions/submit/',
        {
          student: user.id,
          quiz: quizId,
          score: calculatedScore,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('userToken')}`,
          },
        }
      );

      const data = response.data;
      if (data.detail === 'You have one retry left before a 6-hour lockout.') {
        setWarning(data.detail);
        setRetryCooldown(new Date(new Date().getTime() + 6 * 60 * 60 * 1000)); // Set cooldown for 6 hours
      } else if (data.detail === 'Retry limit reached. Please try again after 6 hours.') {
        setRetryBlocked(true);
        setRetryCooldown(new Date(new Date().getTime() + 6 * 60 * 60 * 1000)); // Set cooldown for 6 hours
      } else {
        setSubmissionResult(calculatedScore >= 75 ? 'Pass' : 'Fail');
      }
    } catch (error) {
      setError('Error submitting quiz');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!quizData) return <div>No quiz data available</div>;

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const formatTimeLeft = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className='dark:bg-gray-800 dark:text-gray-100'>
      <div className='container p-2 h-[100vh] md:w-[60%] md:ml-[270px] lg:mx-auto lg:w-[60%]'>
        <h1 className='font-bold p-2'>Quiz Title: {quizData.quiz_title}</h1>
        {submissionResult ? (
          <div className='mx-5'>
            <h2>{`Your score is: ${score}%`}</h2>
            <h2>{`Status: ${submissionResult}`}</h2>
            {warning && <div className="alert alert-warning py-3 dark:text-yellow-400">{warning}</div>}
            {retryBlocked && retryCooldown && (
              <div>
                <h3>Retry is blocked. Time left: {formatTimeLeft(Math.floor((retryCooldown - new Date()) / 1000))}</h3>
              </div>
            )}
            {submissionResult === 'Pass' && (
              <button className='p-2 dark:text-white rounded-lg mx-3 mt-[200px] dark:bg-yellow-400 font-semibold bg-gray-500 text-gray-100' onClick={() => window.location.reload()}>
                Continue
              </button>
            )}
            {!retryBlocked && (
              <button className='p-2 dark:bg-gray-300 rounded-lg dark:text-cyan-950 font-semibold bg-gray-500 text-gray-100' onClick={() => window.location.reload()}>
                Retry
              </button>
            )}
          </div>
        ) : (
          <>
            <div key={currentQuestion.id}>
              <h3 className='font-semibold italic ml-2 py-2'>
                {currentQuestionIndex + 1}. {currentQuestion.question_text}
              </h3>
              <ul>
                {currentQuestion.choices.map((choice) => (
                  <li key={choice.id} className='ml-3'>
                    <label>
                      <input
                        type="radio"
                        className='mx-2'
                        name={`question_${currentQuestion.id}`}
                        value={choice.id}
                        checked={answers[currentQuestion.id] === choice.id}
                        onChange={() => handleAnswerChange(currentQuestion.id, choice.id)}
                      />
                      {choice.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex gap-5 w-[80%] lg:w-[20%] items-end justify-end mx-auto mt-[200px]'>
              <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className='p-2 dark:bg-gray-300 rounded-lg dark:text-cyan-950 font-semibold bg-gray-500 text-gray-100'>
                Previous
              </button>
              {currentQuestionIndex < quizData.questions.length - 1 ? (
                <button onClick={handleNext} className='p-2 dark:bg-gray-300 rounded-lg dark:text-cyan-950 font-semibold bg-gray-500 text-gray-100' disabled={!isAnswerSelected}>
                  Next
                </button>
              ) : (
                <button onClick={handleSubmit} className='p-2 dark:bg-yellow-400 rounded-lg dark:text-white dark:hover:shadow-md dark:hover:shadow-white hover:cursor-pointer font-semibold bg-yellow-500 text-gray-200' disabled={!isAnswerSelected || retryBlocked}>
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizDetail;
