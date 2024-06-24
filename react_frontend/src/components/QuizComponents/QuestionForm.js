import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizQuestion = () => {
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);
    const [isMultipleChoice, setIsMultipleChoice] = useState(false);
    const [formData, setFormData] = useState({
        quiz_id: '',
        question_text: '',
        choices: ['', '', '', ''],
        correct_choices: [],
    });

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/assignments/quiz/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('userToken')}`,
                },
            });
            setQuizzes(response.data);
            console.log('fetched quiz data', quizzes)
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChoiceChange = (index, value) => {
        const newChoices = [...formData.choices];
        newChoices[index] = value;
        setFormData({
            ...formData,
            choices: newChoices,
        });
    };

    const handleCorrectChoiceChange = (value) => {
        if (isMultipleChoice) {
            const newCorrectChoices = formData.correct_choices.includes(value)
                ? formData.correct_choices.filter(choice => choice !== value)
                : [...formData.correct_choices, value];
            setFormData({
                ...formData,
                correct_choices: newCorrectChoices,
            });
        } else {
            setFormData({
                ...formData,
                correct_choices: [value],
            });
        }
    };

    const handleAddChoice = () => {
        setFormData({
            ...formData,
            choices: [...formData.choices, ''],
        });
    };

    const handleRemoveChoice = (index) => {
        const newChoices = formData.choices.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            choices: newChoices,
            correct_choices: formData.correct_choices.filter(choice => choice !== formData.choices[index]),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('quiz_title', formData.quiz_id); // Ensure formData.quiz is the quiz ID (an integer)
        formDataToSend.append('question_text', formData.question_text);
    
        // Append choices and correct_choices
        formData.choices.forEach((choice, index) => {
            formDataToSend.append(`choices[${index}].text`, choice); // Append choice text
            formDataToSend.append(`choices[${index}].is_correct`, formData.correct_choices.includes(choice)); // Set is_correct based on correctness
        });
    
        try {
            const response = await axios.post(
                `http://localhost:8000/assignments/questions/create-question/${formData.quiz}/`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Token ${localStorage.getItem('userToken')}`,
                    },
                }
            );
    
            setFormData({
                ...formData,
                question_text: '',
                choices: ['', '', '', ''],
                correct_choices: [],
            });
            console.log('question data', formData);
        } catch (error) {
            console.error('Error creating question:', error);
            if (error.response && error.response.data) {
                console.error('Server response:', error.response.data);
            }
        }
    };
    const handleFinish = () => {
        navigate('/dashboard');
    };

    return (
        <div className="mx-auto mt-10 md:w-[62%] md:mr-[50px] text-cyan-950 lg:mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-900">
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" htmlFor="quiz">
                        Quiz
                    </label>
                    <select
                        name="quiz"
                        id="quiz"
                        value={formData.quiz}
                        onChange={handleChange}
                        className="bg-gray-100 appearance-none border-none rounded dark:bg-gray-700 dark:text-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Quiz</option>
                        {quizzes.map((quiz) => (
                            <option key={quiz.id} value={quiz.id}>
                                {quiz.quiz_title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100" htmlFor="question_text">
                        Question Text
                    </label>
                    <textarea
                        name="question_text"
                        id="question_text"
                        value={formData.question_text}
                        onChange={handleChange}
                        className="bg-gray-100 appearance-none border-none dark:bg-gray-700 dark:text-gray-50 outline-none rounded w-full h-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100">
                        Choices
                    </label>
                    {formData.choices.map((choice, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                name={`choice${index}`}
                                value={choice}
                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                                className="bg-gray-100 appearance-none border-none rounded dark:bg-gray-700 dark:text-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder={`Choice ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveChoice(index)}
                                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddChoice}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2"
                    >
                        Add Choice
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 dark:text-gray-100">
                        Correct Choice(s)
                    </label>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            name="isMultipleChoice"
                            checked={isMultipleChoice}
                            onChange={() => setIsMultipleChoice(!isMultipleChoice)}
                            className="mr-2"
                        />
                        <label className="dark:text-gray-100">Allow multiple correct choices</label>
                    </div>
                    {formData.choices.map((choice, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type={isMultipleChoice ? "checkbox" : "radio"}
                                name="correct_choice"
                                value={choice}
                                checked={formData.correct_choices.includes(choice)}
                                onChange={() => handleCorrectChoiceChange(choice)}
                                className="mr-2"
                            />
                            <label className="dark:text-gray-100">{choice}</label>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-cyan-950 dark:bg-gray-300 dark:text-cyan-950 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Question
                    </button>
                    <button
                        type="button"
                        onClick={handleFinish}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Finish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizQuestion;
