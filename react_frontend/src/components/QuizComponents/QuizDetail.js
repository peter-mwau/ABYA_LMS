import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';  // Import UserContext

const QuizDetail = () => {
  const { quizId } = useParams();
  const { user } = useContext(UserContext);  // Get user from context
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [percentage, setPercentage] = useState(null);
  const [status, setStatus] = useState(null);

  console.log("user", user)

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

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, quizData.questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleAnswerChange = (questionId, choiceId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choiceId,
    }));
  };

  const handleSubmit = async () => {
    let newScore = 0;
    quizData.questions.forEach((question) => {
      const correctChoice = question.choices.find((choice) => choice.is_correct);
      if (correctChoice && answers[question.id] === correctChoice.id) {
        newScore += 1;
      }
    });

    const totalQuestions = quizData.questions.length;
    const newPercentage = (newScore / totalQuestions) * 100;
    setPercentage(newPercentage);
    setStatus(newPercentage >= 75 ? 'Pass' : 'Fail');

    try {
      const response = await axios.post(
        'http://localhost:8000/assignments/quiz-submissions/submit/',
        {
          quiz: quizId,
          student: user.id,  // Include user ID from context
          score: newPercentage,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('userToken')}`,  // Authorization header
          },
        }
      );
      console.log('Quiz result saved successfully', response.data);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        alert('Retry limit reached. Please try again after 6 hours.');
      } else {
        console.error('Error saving quiz result', error);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setPercentage(null);
    setStatus(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!quizData) return <div>No quiz data available</div>;

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isAnswerSelected = answers[currentQuestion.id] !== undefined;

  return (
    <div className='dark:bg-gray-800 dark:text-gray-100'>
      <div className='container p-2 h-[100vh] md:w-[60%] md:ml-[270px] lg:mx-auto lg:w-[60%]'>
        <h1 className='font-bold p-2'>Quiz Title: {quizData.quiz_title}</h1>
        {percentage !== null ? (
          <div className='text-center mt-4'>
            <h2>Percentage: {percentage.toFixed(2)}%</h2>
            <h2>Status: {status}</h2>
            <button onClick={handleRetry} className='btn btn-primary mt-4'>Retry</button>
            {status === 'Pass' && (
              <button className='btn btn-primary mt-4 ml-2'>Continue</button>
            )}
          </div>
        ) : (
          <>
            <div key={currentQuestion.id}>
              <h3 className='font-semibold italic ml-2 py-2'>{currentQuestionIndex + 1}. {currentQuestion.question_text}</h3>
              <ul>
                {currentQuestion.choices && currentQuestion.choices.map((choice) => (
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
            <div className='flex justify-between mt-4'>
              <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className='btn btn-primary'>
                Previous
              </button>
              {currentQuestionIndex < quizData.questions.length - 1 ? (
                <button onClick={handleNext} className='btn btn-primary' disabled={!isAnswerSelected}>
                  Next
                </button>
              ) : (
                <button onClick={handleSubmit} className='btn btn-primary' disabled={!isAnswerSelected}>
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
