import React from 'react';
import { Star, UserPlus } from 'react-feather';

interface CourseCardProps {
  course: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    createdAt: Date;
  };
  darkMode: boolean;
  isFavorite: boolean;
  isEnrolled: boolean;
  onToggleFavorite: () => void;
  onEnrollClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  darkMode,
  isFavorite,
  isEnrolled,
  onToggleFavorite,
  onEnrollClick,
}) => {
  return (
    <div
      className={`relative flex flex-col max-w-sm rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 ${
        darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'
      }`}
    >
      <button
        onClick={onToggleFavorite}
        className="absolute top-3 right-3 text-yellow-500 hover:text-yellow-600 focus:outline-none"
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? (
          <Star size={24} fill="yellow" color="yellow" />
        ) : (
          <Star size={24} />
        )}
      </button>

      <div className="overflow-hidden w-full h-48 bg-gradient-to-r from-blue-500 to-blue-300">
        <img
          className="object-cover w-full h-full"
          src={course.imageUrl ? course.imageUrl : '/urbano-logo.png'}
          alt={course.name}
        />
      </div>

      <div className="flex flex-col flex-grow p-5">
        <h3 className="mb-2 text-lg font-semibold truncate">{course.name}</h3>
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {course.description}
        </p>
        <span
          className={`inline-block text-xs font-medium py-1 px-3 rounded-full ${
            darkMode ? 'text-gray-200 bg-gray-700' : 'text-blue-700 bg-blue-50'
          }`}
        >
          Created on{' '}
          {new Date(course.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </div>

      <div className="flex justify-between items-center p-5 border-t dark:border-gray-700">
        <button
          onClick={onEnrollClick}
          title={isEnrolled ? 'You are already enrolled' : 'Enroll'}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm rounded-md transition-colors focus:outline-none ${
            isEnrolled
              ? 'text-gray-100 bg-gray-400 cursor-not-allowed'
              : 'text-white bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isEnrolled}
        >
          <UserPlus size={18} />
          {isEnrolled ? 'Enrolled' : 'Enroll'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
