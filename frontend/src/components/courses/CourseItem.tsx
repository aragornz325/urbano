import React, { useEffect, useState } from 'react';

import { CourseCard } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import useAuth from '../../hooks/useAuth';
import EnrollmentService from '../../services/EnrollmentService';
import FavoriteService from '../../services/FavoriteService';
import EnrollmentModal from '../enrollment/EnrollmentModal';

interface CourseItemProps {
  course: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    dateCreated: Date;
  };
  refetch: () => void;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, refetch }) => {
  const { darkMode } = useTheme();
  const { authenticatedUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = useState(false);

  const fetchStatuses = async () => {
    try {
      const [favoriteStatus, enrollmentStatus] = await Promise.all([
        FavoriteService.isFavorite(course.id),
        EnrollmentService.isEnrolled(course.id),
      ]);
      setIsFavorite(favoriteStatus);
      setIsEnrolled(enrollmentStatus);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, [course.id]);

  const toggleFavorite = async () => {
    console.log('toggleFavorite');
    try {
      if (isFavorite) {
        console.log('Removing from favorites');
        await FavoriteService.removeFromFavorite(course.id);
      } else {
        console.log('Adding to favorites');
        await FavoriteService.addToFavorite(course.id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handleEnrollClick = () => {
    setEnrollmentModalOpen(true);
  };

  const handleEnrollConfirm = async () => {
    await EnrollmentService.enroll(course.id);
    setEnrollmentModalOpen(false);
    await fetchStatuses();
  };

  const handleEnrollCancel = () => {
    setEnrollmentModalOpen(false);
  };

  return (
    <>
      {course && (
        <CourseCard
          course={course}
          darkMode={darkMode}
          isFavorite={isFavorite}
          isEnrolled={isEnrolled}
          onToggleFavorite={toggleFavorite}
          onEnrollClick={handleEnrollClick}
        />
      )}

      <EnrollmentModal
        courseId={course.id}
        courseName={course.name}
        isOpen={isEnrollmentModalOpen}
        onClose={handleEnrollCancel}
        onConfirm={handleEnrollConfirm}
      />
    </>
  );
};

export default CourseItem;
