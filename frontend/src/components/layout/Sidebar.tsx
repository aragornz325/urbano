import {
  BookOpen,
  Home,
  LogOut,
  MessageCircle,
  User,
  Users,
} from 'react-feather';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import authService from '../../services/AuthService';
import { useTheme } from './../../context/ThemeContext';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const history = useHistory();
  const location = useLocation(); // Obtén la ubicación actual
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const { darkMode } = useTheme();

  const handleLogout = async () => {
    await authService.logout();
    setAuthenticatedUser(null);
    history.push('/login');
  };

  return (
    <div
      className={`sidebar ${className}`}
      style={{
        backgroundImage: 'url(/sidemenu-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Link to="/" className="text-black no-underline">
        <img
          src={darkMode ? '/urbano-logo-white.png' : '/urbano-logo-black.png'}
          alt="Urbano Logo"
          className="mx-auto w-auto h-12"
        />
      </Link>
      <nav className="flex flex-col flex-grow gap-5 mt-20">
        <SidebarItem to="/" active={location.pathname === '/'}>
          <Home /> Home
        </SidebarItem>
        <SidebarItem to="/courses" active={location.pathname === '/courses'}>
          <BookOpen /> Courses
        </SidebarItem>
        <SidebarItem to="/profile" active={location.pathname === '/profile'}>
          <User /> Profile
        </SidebarItem>
        <SidebarItem to="/contact" active={location.pathname === '/contact'}>
          <MessageCircle /> Contact
        </SidebarItem>
        {authenticatedUser.role === 'admin' ? (
          <SidebarItem to="/users" active={location.pathname === '/users'}>
            <Users /> Users
          </SidebarItem>
        ) : null}
      </nav>
      <button
        className="flex gap-3 justify-center items-center p-3 mt-5 font-semibold text-red-500 rounded-md transition-colors focus:outline-none"
        onClick={handleLogout}
      >
        <LogOut /> Logout
      </button>
    </div>
  );
}
