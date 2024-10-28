import { ReactNode } from 'react';

import { ThemeButton } from '../../components';

interface HeaderProps {
  title: string;
  icon: ReactNode;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, icon, subtitle }) => {
  return (
    <header className="flex justify-between items-center p-4 mb-6 bg-white rounded-md border-b-4 border-blue-600 shadow-md dark:bg-gray-800 dark:border-blue-500">
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center w-10 h-10 text-blue-600 bg-blue-100 rounded-full dark:text-blue-400 dark:bg-blue-700">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-semibold dark:text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <ThemeButton />
    </header>
  );
};

export default Header;
