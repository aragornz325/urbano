import React from 'react';
import { Loader, X } from 'react-feather';
import { useForm } from 'react-hook-form';

import { Modal } from '../../components';
import CreateContentRequest from '../../models/content/CreateContentRequest';

interface AddContentModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: CreateContentRequest) => Promise<void>;
  isSubmitting: boolean;
  error?: string;
}

const AddContentModal: React.FC<AddContentModalProps> = ({
  show,
  onClose,
  onSave,
  isSubmitting,
  error,
}) => {
  const { register, handleSubmit, reset } = useForm<CreateContentRequest>();

  const onSubmit = async (data: CreateContentRequest) => {
    await onSave(data);
    reset();
  };

  return (
    <Modal show={show}>
      <div className="flex justify-between items-center">
        <h1 className="mb-3 font-semibold">Add Content</h1>
        <button onClick={onClose} className="focus:outline-none">
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
          {...register('name')}
          required
          disabled={isSubmitting}
        />
        <input
          type="text"
          className="input"
          placeholder="Description"
          {...register('description')}
          required
          disabled={isSubmitting}
        />
        <button className="btn" disabled={isSubmitting}>
          {isSubmitting ? <Loader className="mx-auto animate-spin" /> : 'Save'}
        </button>
        {error && (
          <div className="p-3 text-red-500 bg-red-50 rounded-md border">
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
};

export default AddContentModal;
