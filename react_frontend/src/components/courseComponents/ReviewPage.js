import React, { useState, useEffect, useContext } from 'react';
import '../../index.css';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../../contexts/courseContext';
import axios from 'axios';
import WalletContext from '../../contexts/walletContext';
import Web3 from 'web3';
import myContractABI from '../../MyContractABI.json';

const CourseReview = ({ courses }) => {
  const [reviews, setReviews] = useState({
    learnerAgency: 0,
    criticalThinking: 0,
    collaborativeLearning: 0,
    reflectivePractice: 0,
    adaptiveLearning: 0,
    authenticLearning: 0,
    technologyIntegration: 0,
    learnerSupport: 0,
    assessmentForLearning: 0,
    engagementAndMotivation: 0,
  });
  
  const [totalRating, setTotalRating] = useState(0);
  const [status, setStatus] = useState('');
  const { courseId } = useParams();
  const { course } = useContext(CourseContext);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { account, connectWallet } = useContext(WalletContext);
  const [checksumAccount, setChecksumAccount] = useState("");
  const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

  const contractABI = myContractABI;
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  useEffect(() => {
    if (account) {
      const checksumAddress = Web3.utils.toChecksumAddress(account);
      setChecksumAccount(checksumAddress);
      console.log("Checksum Account: ", checksumAddress);
    }
  }, [account]);

  console.log("Course Details: ", course);

  const descriptions = {
    learnerAgency: 'Ability to take control of learning process',
    criticalThinking: 'Analyze and evaluate evidence and arguments',
    collaborativeLearning: 'Engagement in group learning activities',
    reflectivePractice: 'Learning through reflection on experience',
    adaptiveLearning: 'Ability to adjust learning strategies as needed',
    authenticLearning: 'Learning through real-world tasks',
    technologyIntegration: 'Effective use of technology in learning',
    learnerSupport: 'Resources and help available to learners',
    assessmentForLearning: 'Feedback and assessments to support learning',
    engagementAndMotivation: 'Learner interest and motivation in the course',
  };

  const handleRating = (metric, value) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [metric]: value,
    }));
  };

  console.log("Course ID: ", courseId);
  console.log("Reviews: ", reviews);

  useEffect(() => {
    const totalPossible = Object.keys(reviews).length * 10;
    const currentTotal = Object.values(reviews).reduce((acc, rating) => acc + rating, 0);
    const ratingPercentage = (currentTotal / totalPossible) * 100;

    setTotalRating(ratingPercentage.toFixed(1));

    if (ratingPercentage >= 80) {
      setStatus('Passed');
    } else {
      setStatus('Failed');
    }
  }, [reviews]);

  const renderStars = (metric) => {
    return [...Array(10)].map((_, index) => {
      const starValue = index + 1;
      return (
        <span
          key={starValue}
          className={`star ${reviews[metric] >= starValue ? 'filled' : ''}`}
          onClick={() => handleRating(metric, starValue)}
        >
          ★
          <span className="star-number">{starValue}</span>
        </span>
      );
    });
  };

  useEffect(() => {
    if (account) {
      const checksumAddress = Web3.utils.toChecksumAddress(account);
      setChecksumAccount(checksumAddress);
      console.log("Checksum Account: ", checksumAddress);
    }
  }, [account]);
  
  const handleSubmit = async () => {
    const web3 = new Web3(window.ethereum); // or window.celo if using Celo
    const contract = new web3.eth.Contract(contractABI, contractAddress);
  
    // Ensure wallet is connected
    if (!account) {
      await connectWallet();
    }
  
    // Request account access
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('User denied account access');
      setError('Please allow access to your Ethereum account.');
      return;
    }
  
    const checksumAddress = Web3.utils.toChecksumAddress(account);
  
    try {
      // Creating the transaction
      const transaction = contract.methods.submitReview(courseId, reviews);
      
      // Estimate gas
      const gas = await transaction.estimateGas({ from: checksumAddress });
      
      // Sending the transaction
      const transactionReceipt = await transaction.send({ from: checksumAddress, gas });
  
      if (transactionReceipt.status) {
        setSuccess('Review submitted successfully!');
      } else {
        console.error("Transaction failed");
        setError('Transaction failed.');
      }
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setError(error.message || 'An error occurred during the transaction.');
    }
  };
  

  return (
    <div className="course-review dark:bg-gray-900 dark:text-white">
      <h2 className="dark:text-white py-1">Course Review</h2>
      {success && <div className="text-green-500 font-medium text-center py-2">{success}</div>}
      <hr />
      <h2 className="font-semibold text-2xl text-center text-gray-700 py-2 dark:text-gray-200">
        {course.course_name}
      </h2>
      <p className="text-gray-800 text-center py-2 dark:text-gray-400">
        Course ID: <span className="text-yellow-400 text-center pb-10 italic font-bold">{courseId}</span>
      </p>
      <hr />
      {Object.keys(reviews).map((metric) => (
        <div className="metric pt-2" key={metric}>
          <p>
            <span className="dark:text-gray-200 uppercase">{metric.replace(/([A-Z])/g, ' $1').trim()}:{' '}</span>
            <span className="description dark:text-gray-400">{descriptions[metric]}</span>
          </p>
          <div className="stars-container flex flex-row justify-between">
            <div className="items-start">{renderStars(metric)}</div>
            <span className="selected-rating dark:text-gray-300 items-end">
              {reviews[metric] ? `${reviews[metric]} / 10` : 'No rating'}
            </span>
          </div>
        </div>
      ))}

      <div className="summary dark:bg-gray-600 flex flex-row justify-around">
        <div className="items-start my-auto">
          <button
            onClick={handleSubmit}
            className="dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-white bg-cyan-950 text-gray-200 hover:bg-yellow-500 hover:shadow-lg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
          >
            Submit Review
          </button>
        </div>
        <div className="items-end">
          <h3 className="dark:text-gray-100">Summary</h3>
          <p>Total Rating: {totalRating}%</p>
          <p>
            Status:{' '}
            <span className={`status ${status === 'Passed' ? 'passed' : 'failed'}`}>{status}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
