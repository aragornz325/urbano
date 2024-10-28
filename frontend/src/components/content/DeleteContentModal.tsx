import React from 'react';
import { AlertTriangle, Loader } from 'react-feather';

import { Modal } from '../../components';

interface DeleteContentModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  error?: string;
}

const DeleteContentModal: React.FC<DeleteContentModalProps> = ({
  show,
  onClose,
  onDelete,
  isDeleting,
  error,
}) => {
  return (
    <Modal show={show}>
      <AlertTriangle size={30} className="fixed mr-5 text-red-500" />
      <div className="ml-10">
        <h3 className="mb-2 font-semibold">Delete Content</h3>
        <hr />
        <p className="mt-2">
          Are you sure you want to delete the content? All of content's data
          will be permanently removed.
          <br />
          This action cannot be undone.
        </p>
      </div>
      <div className="flex flex-row gap-3 justify-end mt-5">
        <button className="btn" onClick={onClose} disabled={isDeleting}>
          Cancel
        </button>
        <button className="btn danger" onClick={onDelete} disabled={isDeleting}>
          {isDeleting ? <Loader className="mx-auto animate-spin" /> : 'Delete'}
        </button>
      </div>
      {error && (
        <div className="p-3 font-semibold text-red-500 bg-red-50 rounded-md border">
          {error}
        </div>
      )}
    </Modal>
  );
};

export default DeleteContentModal;
