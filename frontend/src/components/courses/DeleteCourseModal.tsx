import React from 'react';
import { AlertCircle, AlertTriangle } from 'react-feather';

import { CustomButton } from '../../components';
import { Modal } from '../../components';
import { useTheme } from '../../context/ThemeContext';

interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  error: string | null;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  error,
}) => {
  const { darkMode } = useTheme();

  const containerClass = darkMode
    ? 'bg-gray-800 text-white'
    : 'bg-white text-gray-900';
  const iconClass = darkMode ? 'text-yellow-400' : 'text-red-500';
  const errorClass = darkMode ? 'text-yellow-400' : 'text-red-500';

  return (
    <Modal show={isOpen}>
      <div className={`p-5 rounded ${containerClass}`}>
        <div className="flex gap-2 items-center">
          <AlertTriangle size={30} className={iconClass} />
          <h3 className="text-lg font-semibold">Delete Course</h3>
        </div>
        <p className="mt-2">
          Are you sure you want to delete the course? This action cannot be
          undone.
        </p>
        <div className="flex justify-around mt-5">
          <CustomButton onClick={onClose} color="bg-gray-500" text="Cancel" />
          <CustomButton
            onClick={onDelete}
            color="bg-red-500 text-white"
            icon={<AlertCircle />}
            text="Delete"
          />
        </div>
        {error && <div className={`mt-3 ${errorClass}`}>{error}</div>}
      </div>
    </Modal>
  );
};

export default DeleteCourseModal;
