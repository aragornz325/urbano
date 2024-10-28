import React from 'react';
import { Loader, X } from 'react-feather';
import { useForm } from 'react-hook-form';

import { Modal } from '../../components';
import UpdateUserRequest from '../../models/user/UpdateUserRequest';

interface UpdateUserModalProps {
  show: boolean;
  userData: UpdateUserRequest;
  isSubmitting: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (data: UpdateUserRequest) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  show,
  userData,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}) => {
  const { register, handleSubmit, reset } = useForm<UpdateUserRequest>({
    defaultValues: userData,
  });

  return (
    <Modal show={show}>
      <div className="flex">
        <h1 className="font-semibold">Update User</h1>
        <button className="ml-auto" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('firstName')}
          placeholder="First Name"
          className="input"
        />
        <input
          {...register('lastName')}
          placeholder="Last Name"
          className="input"
        />
        <input
          {...register('username')}
          placeholder="Username"
          className="input"
        />
        <input
          {...register('email')}
          placeholder="Email"
          className="input"
          type="email"
        />
        <select {...register('role')} className="input">
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn" disabled={isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin" /> : 'Save'}
        </button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
    </Modal>
  );
};

export default UpdateUserModal;
