import React from 'react';

import EnrollmentService from '../../services/EnrollmentService';

interface EnrollmentModalProps {
  courseName: string;
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  courseName,
  isOpen,
  onClose,
  onConfirm,
  courseId,
}) => {
  if (!isOpen) return null;

  const handleEnroll = async () => {
    await EnrollmentService.enroll(courseId);
    onClose();
    onConfirm();
  };

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="p-6 w-11/12 max-w-md bg-white rounded-lg dark:bg-gray-800 dark:text-white">
        <h2 className="mb-4 text-lg font-semibold">Enrollment Confirmation</h2>
        <p className="mb-6">
          You are about to enroll in the course <strong>{courseName}</strong>.
          Are you sure?
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleEnroll}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
