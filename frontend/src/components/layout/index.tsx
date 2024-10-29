import { ReactNode, useCallback, useState } from 'react';
import { Menu, X } from 'react-feather';

import { Header } from '../../components';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  title: string;
  icon: ReactNode;
  subtitle?: string;
}

const ToggleSidebarButton = ({
  isSidebarVisible,
  onClick,
}: {
  isSidebarVisible: boolean;
  onClick: () => void;
}) => (
  <button
    aria-label={isSidebarVisible ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
    className={`fixed bottom-5 border shadow-md bg-white p-3 rounded-full transition-all focus:outline-none lg:hidden ${
      isSidebarVisible ? 'right-5' : 'left-5'
    }`}
    onClick={onClick}
  >
    {isSidebarVisible ? <X size={30} /> : <Menu size={30} />}
  </button>
);

export default function Layout({
  children,
  title,
  icon,
  subtitle,
}: LayoutProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = useCallback(() => {
    setShowSidebar((prev) => !prev);
  }, []);

  return (
    <>
      <Sidebar className={showSidebar ? 'show' : ''} />
      <div className="px-5 py-5 pt-10 mx-auto lg:ml-72 sm:px-10">
        <Header title={title} subtitle={subtitle} icon={icon} />
        {children}
      </div>
      <ToggleSidebarButton
        isSidebarVisible={showSidebar}
        onClick={toggleSidebar}
      />
    </>
  );
}
