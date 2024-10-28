import React from 'react';
import { Loader, X } from 'react-feather';
import { useForm } from 'react-hook-form';

import CreateUserRequest from '../../models/user/CreateUserRequest';

interface AddUserModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: CreateUserRequest) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  show,
  onClose,
  onSave,
  isSubmitting,
  error,
}) => {
  const { register, handleSubmit, reset } = useForm<CreateUserRequest>();

  const submitHandler = async (data: CreateUserRequest) => {
    await onSave(data);
    reset();
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="flex items-center">
        <h1 className="mb-3 font-semibold">Add User</h1>
        <button className="ml-auto focus:outline-none" onClick={onClose}>
          <X size={30} />
        </button>
      </div>
      <hr className="mb-5 border-brand-active" />

      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-5 sm:flex-row">
          <input
            type="text"
            className="input sm:w-1/2"
            placeholder="First Name"
            required
            disabled={isSubmitting}
            {...register('firstName')}
          />
          <input
            type="text"
            className="input sm:w-1/2"
            placeholder="Last Name"
            required
            disabled={isSubmitting}
            {...register('lastName')}
          />
        </div>
        <input
          type="text"
          className="input"
          required
          placeholder="Username"
          disabled={isSubmitting}
          {...register('username')}
        />
        <input
          type="email"
          className="input"
          required
          placeholder="Email"
          disabled={isSubmitting}
          {...register('email')}
        />
        <input
          type="password"
          className="input"
          required
          placeholder="Password (min 6 characters)"
          disabled={isSubmitting}
          {...register('password')}
        />
        <select
          className="input"
          required
          {...register('role')}
          disabled={isSubmitting}
        >
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn" disabled={isSubmitting}>
          {isSubmitting ? <Loader className="mx-auto animate-spin" /> : 'Save'}
        </button>
        {error && (
          <div className="p-3 font-semibold text-red-500 bg-red-50 rounded-md border">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddUserModal;
