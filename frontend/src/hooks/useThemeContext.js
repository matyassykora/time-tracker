import { createContext, useContext } from 'react';
import usePersistedState from 'hooks/usePersistedState';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = usePersistedState('darkmode', false);
    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => {
    return useContext(ThemeContext);
}
