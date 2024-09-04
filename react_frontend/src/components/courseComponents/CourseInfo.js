import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WalletContext from "../../contexts/walletContext";
import Web3 from 'web3';
import myContractABI from '../../MyContractABI.json';


const CourseInfo = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { courseId } = useParams();
  const { user } = useContext(UserContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [courseDetails, setCourseDetails] = useState(null);
  const { account, isWalletConnected, connectWallet } = useContext(WalletContext);
  const [checksumAccount, setChecksumAccount] = useState("");
  const [successMessage, setSuccessMessage] = useState('');

  const contractABI = myContractABI;
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  useEffect(() => {
    if (account) {
      const checksumAddress = Web3.utils.toChecksumAddress(account);
      setChecksumAccount(checksumAddress);
      console.log("Checksum Account: ", checksumAddress);
    }
  }, [account]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}/courses/course_info/${courseId}/`, {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });
  
        if (response.status === 200) {
          setCourseDetails(response.data);
          setIsEnrolled(response.data.is_enrolled);
          console.log("COURSE DETAILS:  ", courseDetails);
          console.log("Enrollment Status:  ", isEnrolled);
        } else {
          setErrorMessage('Failed to fetch course details');
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
        setErrorMessage(error.message || 'An error occurred while fetching course details');
      }
    };
  
   
      fetchCourseDetails();
    }, []);

  // Function to enroll in the course on the blockchain
const enrollInCourseOnBlockchain = async (courseId) => {
  const web3 = new Web3(window.ethereum); // Assuming you're using MetaMask
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Connect to wallet if not connected
  if (!account) {
    await connectWallet();
  }

  try {
    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Creating the transaction
			const transaction = contract.methods.enrollInCourse(courseId);
	
			// Estimate gas
			const gas = await transaction.estimateGas({ from: account });
			const transactionReceipt = await transaction.send({ from: account, gas });
	
			// If the transaction is successful
			if (transactionReceipt.status) {
				setSuccessMessage(`You have successfully being enrolled into course ${courseId}`);
			} else {
				console.error("Transaction failed");
				setErrorMessage({ transaction: "Blockchain transaction failed" });
        console.log(errorMessage);
			}

    return true; // Successful transaction
  } catch (error) {
    console.error('Blockchain transaction failed:', error);
    throw new Error('Blockchain transaction failed');
  }
};

const enrollCourse = async () => {
  try {
    const txSuccess = await enrollInCourseOnBlockchain(courseId, checksumAccount);
    
    if (txSuccess) {
      // Step 2: If blockchain transaction is successful, enroll in the course on the backend
      const userToken = localStorage.getItem('userToken');
      const response = await axios.post(`${BASE_URL}/courses/enroll/${courseId}/`, { account: checksumAccount }, {
        headers: {
          'Authorization': `Token ${userToken}`,
        },
      });

      if (response.status === 200) {
        setIsEnrolled(true);
        setErrorMessage('');
      } else {
        setErrorMessage(response.data);
      }
    }
  } catch (error) {
    console.error("Error enrolling in course:", error);
    setErrorMessage(error.message || "An error occurred");
  }
};

  const unenrollCourse = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const response = await axios.post(`${BASE_URL}/courses/unenroll/${courseId}/`, { account: checksumAccount},
        {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });

      if (response.status !== 200) {
        // throw new Error('Failed to unenroll from the course');
        setErrorMessage(response.data)
      }

      // Update enrollment status
      setIsEnrolled(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className='dark:bg-gray-800 h-[100vh]'>
    <div className="mx-auto p-4 text-cyan-950 dark:text-gray-100 md:pl-[280px] md:w-[90%] lg:w-[60%] lg:pl-[200px]">
      {successMessage && <div className='text-green-500 text-sm text-center'>{successMessage}</div>}
    {courseDetails ? (
      <>
      <h1 className="text-3xl font-bold mb-4">{courseDetails['course_name']}</h1>
      {/* // {errorMessage && <div className='text-red-500 py-3'>{errorMessage}</div>} */}
       <p className='text-justify text-xl dark:text-gray-300'>{courseDetails['course_description']}</p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Total Chapters: <span className='font-semibold italic'>{courseDetails['total_chapters']}</span></p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Total Lessons: <span className='font-semibold italic'>{courseDetails['total_lessons']}</span></p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Total Quizes: <span className='font-semibold italic'>{courseDetails['total_quizzes']}</span></p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Enrolled Students: <span className='font-semibold italic'>{courseDetails['students']?.length || 0}</span></p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Course Creator: <span className='font-semibold italic'>{courseDetails['teacher_name']}</span></p>
      </>
    ) : (
      <div>Loading course details...</div> // Or any other placeholder content
    )}
      
      {user.user_type ==="Student" && (
          isEnrolled ? ( 
            <button className='bg-red-600 dark:bg-red-600 dark:text-white text-gray-100 p-2 rounded my-2 font-semibold' onClick={unenrollCourse}>Unenroll</button>
           ) : ( 
            <button className='bg-cyan-950 text-gray-100 p-1 rounded my-2 font-semibold dark:text-cyan-950 dark:bg-yellow-400' onClick={enrollCourse}>Enroll</button>
          )
         )
         }
      
      {isEnrolled && (
      <button onClick={() => navigate(`/course/${courseId}`)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4'>
        More Info
      </button>
)}
    {user.user_type === "Teacher" && (
      <button onClick={() => navigate(`/course/${courseId}`)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded ml-2'>
        More Info
      </button>
    )}
    </div>
    </div>
    </>
  );
};

export default CourseInfo;
