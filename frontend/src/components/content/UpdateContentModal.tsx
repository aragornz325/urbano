import React from 'react';
import { Loader, X } from 'react-feather';
import { useForm } from 'react-hook-form';

import { Modal } from '../../components';
import UpdateContentRequest from '../../models/content/UpdateContentRequest';

interface UpdateContentModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateContentRequest) => void;
  isSubmitting: boolean;
  error?: string;
}

const UpdateContentModal: React.FC<UpdateContentModalProps> = ({
  show,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}) => {
  const { register, handleSubmit } = useForm<UpdateContentRequest>();

  return (
    <Modal show={show}>
      <div className="flex">
        <h1 className="mb-3 font-semibold">Update Content</h1>
        <button className="ml-auto focus:outline-none" onClick={onClose}>
          <X size={30} />
        </button>
      </div>
      <hr />
      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="input"
          placeholder="Name"
          required
          {...register('name')}
        />
        <input
          type="text"
          className="input"
          placeholder="Description"
          required
          {...register('description')}
        />
        <button className="btn" disabled={isSubmitting}>
          {isSubmitting ? <Loader className="mx-auto animate-spin" /> : 'Save'}
        </button>
        {error && (
          <div className="p-3 font-semibold text-red-500 bg-red-50 rounded-md border">
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
};

export default UpdateContentModal;
