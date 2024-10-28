import React from 'react';
import { Moon, Sun } from 'react-feather';

import { useTheme } from '../../context/ThemeContext';

const ThemeButton: React.FC = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <label className="flex gap-2 items-center cursor-pointer">
      <Sun
        className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-yellow-500'}`}
      />
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        onClick={() => setDarkMode(!darkMode)}
        className="hidden"
      />
      <div
        onClick={() => setDarkMode(!darkMode)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
          darkMode ? 'bg-gray-700' : 'bg-yellow-400'
        }`}
      >
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform duration-300 transform ${
            darkMode ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        ></div>
      </div>
      <Moon
        className={`w-5 h-5 ${darkMode ? 'text-purple-300' : 'text-gray-500'}`}
      />
    </label>
  );
};

export default ThemeButton;
