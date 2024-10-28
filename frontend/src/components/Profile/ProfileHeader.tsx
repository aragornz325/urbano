import { User } from 'react-feather';

import { ThemeButton } from '../../components';

interface ProfileHeaderProps {
  username: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username }) => (
  <div className="flex justify-between items-center mb-5">
    <div className="flex justify-center items-center w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-500">
      <User className="w-12 h-12 text-brand-primary dark:text-dark-primary" />
    </div>
    <ThemeButton />
    <h1 className="mb-5 text-4xl font-semibold text-center">{`Welcome, ${username}`}</h1>
  </div>
);

export default ProfileHeader;
