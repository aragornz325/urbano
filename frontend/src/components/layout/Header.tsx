import { ReactNode } from 'react';

import { ThemeButton } from '../../components';

interface HeaderProps {
  title: string;
  icon: ReactNode;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, icon, subtitle }) => {
  return (
    <header className="flex justify-between items-center p-4 mb-6 rounded-md border-b-4 shadow-md bg-brand-header_background border-brand-primary dark:bg-gray-800 dark:border-brand-secondary">
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-brand-header_background text-brand-primary_text dark:text-blue-400 dark:bg-brand-secondary">
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
