import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="theme-toggle-track">
                <div className={`theme-toggle-thumb ${theme === 'dark' ? 'active' : ''}`}>
                    {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
                </div>
            </div>
        </button>
    );
};

export default DarkModeToggle;
