import { ThemeProvider } from './ThemeSwitcher';
import { useState, useEffect } from 'react';
import { UserContext } from './contexts/userContext';
import axios from 'axios';

export default function Providers({ children }) {
    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);

        const fetchProfile = async () => {
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                try {
                    const response = await axios.get('http://localhost:8000/users/profile/', {
                        headers: {
                            Authorization: `Token ${userToken}`,
                        },
                    });
                    console.log('Fetched data:', response.data);
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to fetch profile:', error);
                }
            }
            setIsLoading(false);
        };

        fetchProfile();
    }, []);

    if (!mounted) {
        return null;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider attribute="class">
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </ThemeProvider>
    );
}
