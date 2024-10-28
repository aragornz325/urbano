import React from 'react';
import { AlertTriangle, Loader } from 'react-feather';

import { Modal } from '../../components';

interface DeleteUserModalProps {
  show: boolean;
  isDeleting: boolean;
  error: string | null;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  show,
  isDeleting,
  error,
  onClose,
  onDelete,
}) => (
  <Modal show={show}>
    <div className="flex">
      <AlertTriangle size={30} className="text-red-500" />
      <h3 className="mb-2 ml-3 font-semibold">Delete User</h3>
    </div>
    <p>
      Are you sure you want to delete this user? This action cannot be undone.
    </p>
    <div className="flex gap-3 justify-end mt-5">
      <button className="btn" onClick={onClose} disabled={isDeleting}>
        Cancel
      </button>
      <button className="btn danger" onClick={onDelete} disabled={isDeleting}>
        {isDeleting ? <Loader className="animate-spin" /> : 'Delete'}
      </button>
    </div>
    {error && <div className="text-red-500">{error}</div>}
  </Modal>
);

export default DeleteUserModal;
