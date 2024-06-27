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
    <div>
      <h1>{quizData.quiz_title}</h1>
      <p>{quizData.quiz_description}</p>
      {quizData.questions.map((question) => (
        <div key={question.id}>
          <h3>{question.question_text}</h3>
          <ul>
            {question.choices.map((choice) => (
              <li key={choice.id}>
                {choice.text} {choice.is_correct && <strong>(Correct)</strong>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizDetail;