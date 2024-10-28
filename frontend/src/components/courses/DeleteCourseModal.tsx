import React from 'react';
import { AlertTriangle } from 'react-feather';

import { Modal } from '../../components';

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
  return (
    <Modal show={isOpen}>
      <div>
        <AlertTriangle size={30} className="text-red-500" />{' '}
        <h3>Delete Course</h3>
      </div>
      <p>
        Are you sure you want to delete the course? This action cannot be
        undone.
      </p>
      <div className="flex justify-end mt-5">
        <button onClick={onClose}>Cancel</button>
        <button onClick={onDelete} className="btn danger">
          Delete
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </Modal>
  );
};

export default DeleteCourseModal;
