import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionForm() {
    const [quizTitle, setQuizTitle] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [choices, setChoices] = useState(Array.from({ length: 4 }, () => ({ text: '', isCorrect: false })));
    const [multipleCorrect, setMultipleCorrect] = useState(false);
    const [quizzes, setQuizzes] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const questionData = {
            quiz_title: quizTitle,
            question_text: questionText,
            choices: choices,
        };

        try {
            const response = await axios.post('http://localhost:8000/assignments/quiz/create-quiz/', questionData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    function handleChoiceChange(index, field, value) {
        setChoices(prevChoices => {
            return prevChoices.map((choice, i) => {
                if (i === index) {
                    return {...choice, [field]: value};
                } else if (field === 'isCorrect' && !multipleCorrect) {
                    return {...choice, isCorrect: false};
                } else {
                    return choice;
                }
            });
        });
    }

    const addChoice = () => {
        setChoices([...choices, { text: '', isCorrect: false }]);
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/assignments/quiz/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('userToken')}`,
                    },
                });
                const quizTitles = response.data.map(quiz => quiz.quiz_title);
                setQuizzes(quizTitles);
                console.log("Quiz Titles: ", quizTitles);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchQuizzes();
    }, []);

    return (
        <div className="mx-auto mt-10 md:w-[62%] md:mr-[50px] text-cyan-950 lg:mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-900">
            <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" >
                Quiz Title:
                <select value={quizTitle} onChange={e => setQuizTitle(e.target.value)} className="bg-gray-100 appearance-none border-none rounded dark:bg-gray-700 dark:text-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select Quiz</option>
                        {quizzes.map((quiz, index) => (
                        <option key={index} value={quiz}>
                            {quiz}
                        </option>
                        ))}
                        </select>
            </label>
            <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" >
                Question Text:
                <textarea value={questionText} onChange={e => setQuestionText(e.target.value)}  className="bg-gray-100 appearance-none border-none rounded dark:bg-gray-700 dark:text-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </label>
            <label className='text-lg font-bold dark:text-gray-100 text-gray-700 gap-1 my-2'>
                Multiple Correct Choices:
                <input type="checkbox" className='gap-2 w-4 h-4 active:bg-yellow-400 rounded-sm mx-2' checked={multipleCorrect} onChange={e => setMultipleCorrect(e.target.checked)} />
            </label>
            {choices.map((choice, index) => (
                <div key={index} className='space-y-3 p-3 space-x-3'>
                    <label className='text-lg font-bold dark:text-gray-100 text-gray-700 gap-1 my-2'>
                        Choice Text:
                        <input type="text" className='space-x-2' value={choice.text} onChange={e => handleChoiceChange(index, 'text', e.target.value)} />
                    </label>
                    <label>
                        Is Correct:
                        {multipleCorrect ? (
                        <input type="checkbox" className='gap-2 w-4 h-4 active:bg-yellow-400 rounded-sm mx-2' checked={choice.isCorrect} onChange={e => handleChoiceChange(index, 'isCorrect', e.target.checked)} />
                            ) : (
                        <input type="radio"  className='gap-2 active:bg-yellow-400 mx-2' name="isCorrect" checked={choice.isCorrect} onChange={e => handleChoiceChange(index, 'isCorrect', e.target.checked)} />
                        )}
                    </label>
                </div>
            ))}
            <button type="button" className="bg-cyan-950 dark:bg-gray-300 dark:text-cyan-950 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  onClick={addChoice}>Add Choice</button>
            <input type="submit" value="Submit" />
        </form>
    </div>
    );
}

export default QuestionForm;