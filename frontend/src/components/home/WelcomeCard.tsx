import React from 'react';

interface WelcomeCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  bgColor?: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  title,
  description,
  imageUrl,
  bgColor,
}) => (
  <div
    className={`flex justify-center items-center p-4 h-48 rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-gray-800 dark:text-gray-100`}
    style={{
      backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: imageUrl ? 'transparent' : bgColor, // Usa el color de fondo si no hay imagen
    }}
  >
    <div className="p-2 text-center bg-white bg-opacity-75 rounded-lg dark:bg-gray-800 dark:bg-opacity-80">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);

export default WelcomeCard;
