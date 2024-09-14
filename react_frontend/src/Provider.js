import React, { useState, useEffect, useMemo} from "react";
import { ThemeProvider } from "./ThemeSwitcher";
import { UserContext } from "./contexts/userContext";
import WalletContext from "./contexts/walletContext";
import { CourseContext } from "./contexts/courseContext";
import axios from "axios";
import Web3 from 'web3';
import myContractABI from '../src/MyContractABI.json';


export default function Providers({ children, courseId }) {
	const BASE_URL = process.env.REACT_APP_API_BASE_URL;
	const [mounted, setMounted] = useState(false);
	const [user, setUser] = useState(null);
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState('');
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [course, setCourseData] = useState([]);
	const [error, setError] = useState(null);
	const [tokenBalance, setTokenBalance] = useState('0');

	const contractABI = myContractABI;
	const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

	const getCourseDetails = async (courseId) => {
		try {
			const response = await axios.get(`${BASE_URL}/courses/course_detail/${courseId}/`, {
			  headers: {
				Authorization: `Token ${localStorage.getItem('userToken')}`
			  }
			});
			  setCourseData(response.data);
			  console.log("Response: ", response.data);
			  setIsLoading(false);
			} catch (error) {
			  setError(error);
			  setIsLoading(false);
			  console.error("Failed to load course summary:", error);
			  setError(`Error loading course summary. Please try again later. If the problem persists, contact support. Error details: ${error.message}`);
			} finally {
				setIsLoading(false);
			}
		  };

		  // Call getCourseDetails initially
		  useEffect(() => {
			let isMounted = true; // Flag to check if component is mounted
		
			if (isMounted) {
				getCourseDetails();
			}
		
			return () => {
				isMounted = false; // Cleanup function to set isMounted to false when component unmounts
			};
		}, [courseId, course]);



	const connectWallet = async () => {
		if (window.ethereum) {
		  try {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			// getbalance
			const web3 = new Web3(window.ethereum);
			const weiBalance = await web3.eth.getBalance(accounts[0]);
			const balance = web3.utils.fromWei(weiBalance, 'ether');
			setBalance(balance);
			setAccount(accounts[0]);
			setIsWalletConnected(true);
			
			
			// Fetch custom token balance
			const tokenContract = new web3.eth.Contract(contractABI, contractAddress);
			const tokenBalanceRaw = await tokenContract.methods.balanceOf(accounts[0]).call();

			// Get token decimals
			const tokenDecimals = await tokenContract.methods.decimals().call();
			const divisor = Math.pow(10, Number(tokenDecimals)); // Convert divisor to a regular number

			// Convert tokenBalanceRaw to a regular number and divide
			const tokenBalanceNumber = Number(tokenBalanceRaw); // Convert balance to a regular number
			const formattedTokenBalance = tokenBalanceNumber / divisor;

			// Set the token balance in state for easier display, if needed
			setTokenBalance(formattedTokenBalance);

			console.log("Token Balance: ", formattedTokenBalance);
			console.log("Token Balance: ", tokenBalance);
		  } catch (error) {
			console.error("Failed to connect to MetaMask:", error);
		  }
		} else {
		  console.log('Please install MetaMask!');
		}
	  };

	  useEffect(() => {
		console.log("Account: ", account, "Balance: ", balance, "Token Balance: ", tokenBalance, "Connection Status: ", isWalletConnected);
	  }, [account, balance,tokenBalance, isWalletConnected]);
	  
	  const disconnectWallet = () => {
		setAccount(null); // Resets the connected account state
		setIsWalletConnected(false);
	  };

	useEffect(() => {
		setMounted(true);

		const fetchProfile = async () => {
			const userToken = localStorage.getItem("userToken");
			if (userToken) {
				try {
					const response = await axios.get(
						`${BASE_URL}/users/profile/`,
						{
							headers: {
								Authorization: `Token ${userToken}`,
							},
						}
					);
					console.log("Fetched data:", response.data);
					setUser(response.data);
				} catch (error) {
					console.error("Failed to fetch profile:", error);
				}
			}
			// setIsLoading(false);
		};

		fetchProfile();
	}, []);


		    // Memoize the context value to avoid unnecessary re-renders
		const walletContextValue = useMemo(() => ({
			account,
			balance,
			tokenBalance,
			isWalletConnected,
			connectWallet,
			disconnectWallet,
		}), [account,balance, tokenBalance, isWalletConnected]);

		if (!mounted) {
			return null;
		}

		if (isLoading) {
			return <div>Loading...</div>;
		}

	return (
		<ThemeProvider attribute="class">
			<UserContext.Provider value={{ user, setUser, balance, account, setAccount, connectWallet, disconnectWallet }}>
				<CourseContext.Provider value={{ course, setCourseData }}>
				<WalletContext.Provider value={walletContextValue}>
					{children}
				</WalletContext.Provider>
				</CourseContext.Provider>
			</UserContext.Provider>
		</ThemeProvider>
	);
}
