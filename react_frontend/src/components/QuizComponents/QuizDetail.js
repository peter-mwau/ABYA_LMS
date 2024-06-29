import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizDetail = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!quizData) return <div>No quiz data available</div>;

  return (
    <>
    <div className=' dark:bg-gray-800 dark:text-gray-100'>
    <div className='container p-2 h-[100vh] md:w-[60%] md:ml-[270px] lg:mx-auto lg:w-[60%]'>
      <h1 className='font-bold p-2'>Quiz Title: {quizData.quiz_title}</h1>
      {/* <p>{quizData.quiz_description}</p> */}
      {quizData.questions.map((question, index) => (
        <div key={question.id}>
          <h3 className='font-semibold italic ml-2 py-2'>{index + 1}. {question.question_text}</h3>
          <ul>
            {question.choices.map((choice) => (
              <li key={choice.id} className='ml-3'>
                <label>
                  <input  type="radio" className='mx-2' name={`question_${question.id}`} value={choice.id}/>
                {choice.text} {choice.is_correct && <strong>(Correct)</strong>}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export default QuizDetail;