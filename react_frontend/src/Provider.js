import { ThemeProvider} from './ThemeSwitcher'
// import { Children } from "react";
import { useState, useEffect } from "react";

export default function Providers({ children }) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) {
        return <>{children}</>
    }
    
    return <ThemeProvider attribute="class">{children}</ThemeProvider>
    }