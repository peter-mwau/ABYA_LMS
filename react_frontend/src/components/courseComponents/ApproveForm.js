// ApprovalForm.js

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import WalletContext from '../../contexts/walletContext';
import Web3 from 'web3';


const ApprovalForm = ({ courseId, onClose }) => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { account } = useContext(WalletContext)
    const [checksumAccount, setChecksumAccount] = useState("");

    useEffect(() => {
        if (account) {
            const checksumAddress = Web3.utils.toChecksumAddress(account);
            setChecksumAccount(checksumAddress);
            console.log("Checksum Account: ", checksumAddress);
        }
    }, [account]);
    const [formData, setFormData] = useState({
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
        // account: account,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: parseInt(value) });
    };

    useEffect(() => {
        // setFormData(formData => ({ ...formData, account: account }));
    }, [account]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userToken = localStorage.getItem('userToken');
            console.log(userToken);

            const updatedFormData = {
                ...formData,
                account: checksumAccount, // Add the account to formData
                userToken: userToken,
            };
            await axios.post(`${BASE_URL}/courses/courses/${courseId}/submit-review/`, updatedFormData, {
                headers: {
                  'Authorization': `Token ${userToken}`,
                },
            });
            alert('Course approved successfully!');
            onClose();
            console.log("Data to send: ", formData);
        } catch (error) {
            console.error('Error submitting review:', error);
            // alert('Error submitting review');
        }
    };

    

    return (
        <div className="approval-form">
            <h2 className='font-semibold text-center py-2'>Approve Course</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    
                    <div key={key} className="form-group py-2">
                        <label className='capitalize'>{key.replace(/([A-Z])/g, ' $1')}:</label>
                        <input
                            type="number"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            min="0"
                            max="10"
                            className='rounded-lg ml-2 dark:text-cyan-950 outline-none'
                            required
                        />
                    </div>
                ))}
                <input type="text" className='bg-gray-600 rounded-lg text-white my-3' value={account} readOnly />
                <button type="submit" className='dark:bg-slate-500 dark:text-white bg-gray-200 text-cyan-950 hover:shadow-lg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline'>Submit Review</button>
            </form>
            {/* <button onClick={onClose}>Close</button> */}
        </div>
    );
};

export default ApprovalForm;
