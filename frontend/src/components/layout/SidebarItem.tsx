import { ReactNode, useState } from 'react';
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  children: ReactNode;
  to: string;
  active?: boolean;
}

export default function SidebarItem({
  children,
  to,
  active = false,
}: SidebarItemProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 800); // Resetea el efecto después de 0.8s
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`flex items-center gap-2 w-full sm:w-auto justify-between no-underline rounded-lg px-4 py-2 transition-colors duration-200 ${
        active || isClicked
          ? 'animate-customPulse bg-dark-primary'
          : 'bg-brand-header_background dark:bg-gray-700'
      }`}
    >
      <div
        className={`flex-shrink-0 text-2xl ${
          active ? 'text-black' : 'text-gray-500 dark:text-white'
        }`}
      >
        {children[0]}
      </div>
      <span
        className={`flex-grow font-semibold text-center ${
          active ? 'text-black' : 'text-gray-500 dark:text-white'
        }`}
      >
        {children[1]}
      </span>
      {active ? (
        <ChevronRight className="text-lg text-black" />
      ) : (
        <div className="w-6" />
      )}
    </Link>
  );
}
