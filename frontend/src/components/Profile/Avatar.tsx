import { Camera } from 'react-feather';

interface AvatarProps {
  imageUrl?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, onClick }) => (
  <div className="relative mx-auto mb-4 w-32 h-32">
    <img
      src={
        imageUrl ||
        'https://res.cloudinary.com/do5hovkvl/image/upload/v1730180708/courses/panel/83abe686-9dbc-43e3-ac01-f04154c864a4.png'
      }
      alt="Profile"
      className="object-cover w-full h-full rounded-full border-4 border-gray-300 dark:border-gray-700"
    />
    <button
      onClick={onClick}
      className="absolute top-0 right-0 p-1 bg-gray-200 rounded-full border border-gray-300 transition dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800"
      aria-label="Change avatar"
    >
      <Camera size={16} className="text-gray-700 dark:text-gray-300" />
    </button>
  </div>
);

export default Avatar;
