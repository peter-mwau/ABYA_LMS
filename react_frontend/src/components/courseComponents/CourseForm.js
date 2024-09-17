import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import upload from "../../images/upload.png";
import { UserContext } from "../../contexts/userContext";
import WalletContext from "../../contexts/walletContext";
import Web3 from 'web3';
import myContractABI from '../../MyContractABI.json';

const CourseForm = () => {
	const BASE_URL = process.env.REACT_APP_API_BASE_URL;
	const [image, setImage] = useState(null);
	const { account,setAccount, isWalletConnected, connectWallet } = useContext(WalletContext);
	const userDetails = useContext(UserContext);
	const [success, setSuccessMessage] = useState("");
	const [checksumAccount, setChecksumAccount] = useState("");

	useEffect(() => {
		if (account) {
			const checksumAddress = Web3.utils.toChecksumAddress(account);
			setChecksumAccount(checksumAddress);
		}
	}, [account]);

	const [formData, setFormData] = useState({
		course_name: "",
		course_description: "",
		account: "",
		picture: null,
		teacher: userDetails && userDetails.user
			? `${userDetails.user.firstname || ""} ${userDetails.user.lastname || ""}`
			: "",
	});

	useEffect(() => {
		setFormData(formData => ({ ...formData, account: checksumAccount }));
	}, [checksumAccount]);

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFileChange = (e) => {
		setFormData({
			...formData,
			picture: e.target.files[0],
		});
		setImage(URL.createObjectURL(e.target.files[0]));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userToken = localStorage.getItem("userToken");
	
		// Connect to wallet if not connected
		if (!account) {
			await connectWallet();
		}
	
		const data = new FormData();
		data.append("course_name", formData.course_name);
		data.append("course_description", formData.course_description);
		data.append("account", formData.account);
		data.append("picture", formData.picture);
		data.append("userToken", userToken);
		data.append(
			"teacher",
			userDetails && userDetails.user
				? `${userDetails.user.firstname || ""} ${userDetails.user.lastname || ""}`
				: ""
		);
	
		try {
			// Save the course to the database first
			const response = await axios.post(
				`${BASE_URL}/courses/courses/create-course/`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Token ${userToken}`,
					},
				}
			);
	
			// Extract the generated course ID from the response
			const courseId = response.data.id;
	
			console.log("Course ID:", courseId);
	
			const abi = myContractABI;
			const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

			console.log("All Environment Variables: ", process.env);

	
			console.log("Contract Address: ", contractAddress);
	
			// Interact with the blockchain using Web3
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(abi, contractAddress);
	
			// Creating the transaction
			const transaction = contract.methods.createCourse(courseId, formData.course_description);
	
			// Estimate gas
			const gas = await transaction.estimateGas({ from: account });
			const transactionReceipt = await transaction.send({ from: account, gas });
	
			// If the transaction is successful
			if (transactionReceipt.status) {
				setSuccessMessage(`${formData.course_name} created successfully on the blockchain and saved in the database.`);
			} else {
				console.error("Transaction failed");
				setErrors({ transaction: "Blockchain transaction failed" });
			}
	
		} catch (error) {
			console.error("Error:", error);
			if (error.response && error.response.data) {
				setErrors(error.response.data);
			}
		}
	};

	useEffect(() => {
		const handleAccountsChanged = (accounts) => {
			if (accounts.length > 0) {
				setAccount(accounts[0]); // Update the account in state
			} else {
				console.log('Please connect to MetaMask.');
			}
		};
	
		window.ethereum.on('accountsChanged', handleAccountsChanged);
	
		return () => {
			window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
		};
	}, []);
	
	
	
	

	return (
		<form onSubmit={handleSubmit} className="md:flex md:space-x-10 justify-between rounded w-full">
			<div className="-mt-4 md:mt-5 md:w-2/3">
				<p className="font-bold text-2xl mb-10">CREATE COURSE</p>
				{success && <p className="text-green-400 font-normal">{success}</p>}
				<input
					type="text"
					name="course_name"
					id="course_name"
					value={formData.course_name}
					onChange={handleChange}
					placeholder="course title"
					className="mb-2 border rounded-lg w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
				<textarea
					name="course_description"
					id="course_description"
					value={formData.course_description}
					onChange={handleChange}
					rows={3}
					placeholder="course description"
					className="my-2 md:my-10 w-full border rounded-lg resize-none py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>

			<label className="cursor-pointer ml-[20%] w-2/5 rounded-lg tracking-wide mt-12 text-center ">
				<aside className={`${image ? "py-4 bg-gray-50" : ""} rounded-lg p-10 text-center items-center border border-dashed`}>
					<img
						src={image ? image : upload}
						alt="upload icon"
						className={`${image ? "w-40 border-slate-600 h-40 ml-0" : "w-20 h-20 ml-6 rounded"}`}
					/>
					<p className="font-semibold my-4">{image ? "Change" : "Choose"} course image</p>
					<input type="file" className="hidden" onChange={handleFileChange} />
				</aside>
			</label>
			<button
				type="submit"
				className="bg-cyan-950 dark:text-cyan-950 absolute mt-[350px] hover:bg-yellow-500 dark:bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Create Course
			</button>
		</form>
	);
};

export default CourseForm;
