import { ThemeProvider } from "./ThemeSwitcher";
// import { Children } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "./contexts/userContext";
import axios from "axios";

export default function Providers({ children }) {
	const [mounted, setMounted] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setMounted(true);

		const fetchProfile = async () => {
			const userToken = localStorage.getItem("userToken");
			console.log(userToken);
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
				console.log("Response:", response);
				setUser(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Failed to fetch profile:", error);
				setIsLoading(false);
			}
		};
		fetchProfile();
	}, []);

	if (!mounted) {
		return <>{children}</>;
	}

	if (!user) {
		return <div>Loading...</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	console.log(user);

	return (
		<ThemeProvider attribute="class">
			<UserContext.Provider value={{ user, setUser }}>
				{children}
			</UserContext.Provider>
		</ThemeProvider>
	);
}
