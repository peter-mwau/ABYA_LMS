import React, { useState, useEffect, useMemo} from "react";
import { ThemeProvider } from "./ThemeSwitcher";
import { UserContext } from "./contexts/userContext";
import WalletContext from "./contexts/walletContext";
import axios from "axios";
import Loading from "./Loading";
import Web3 from 'web3';


export default function Providers({ children }) {
	const [mounted, setMounted] = useState(false);
	const [user, setUser] = useState(null);
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState('');
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	// const [isLoading, setIsLoading] = useState(true);

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
			// console.log("Account: ", account, "Balance: ", balance, "Connection Status: ", isWalletConnected);
		  } catch (error) {
			console.error("Failed to connect to MetaMask:", error);
		  }
		} else {
		  console.log('Please install MetaMask!');
		}
	  };

	  useEffect(() => {
		console.log("Account: ", account, "Balance: ", balance, "Connection Status: ", isWalletConnected);
	  }, [account, balance, isWalletConnected]);
	  
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
						"http://localhost:8000/users/profile/",
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
			isWalletConnected,
			connectWallet,
			disconnectWallet,
		}), [account, isWalletConnected]);

		if (!mounted) {
			return null;
		}

	return (
		<ThemeProvider attribute="class">
			<UserContext.Provider value={{ user, setUser, balance, account, connectWallet, disconnectWallet }}>
				<WalletContext.Provider value={walletContextValue}>
					{children}
				</WalletContext.Provider>
			</UserContext.Provider>
		</ThemeProvider>
	);
}
