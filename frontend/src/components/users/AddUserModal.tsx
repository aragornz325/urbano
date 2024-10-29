import React, { useState } from 'react';
import { Eye, EyeOff, Loader, X } from 'react-feather';
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
  const { register, handleSubmit, reset, watch } = useForm<CreateUserRequest>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const submitHandler = async (data: CreateUserRequest) => {
    await onSave(data);
    reset();
  };

  if (!show) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative p-6 w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex items-center mb-5">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Add User
          </h1>
          <button className="ml-auto focus:outline-none" onClick={onClose}>
            <X size={30} className="text-gray-500 dark:text-gray-300" />
          </button>
        </div>
        <hr className="mb-5 border-gray-300 dark:border-gray-600" />

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col gap-5 sm:flex-row">
            <input
              type="text"
              className="input bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:w-1/2"
              placeholder="First Name"
              required
              disabled={isSubmitting}
              {...register('firstName')}
            />
            <input
              type="text"
              className="input bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:w-1/2"
              placeholder="Last Name"
              required
              disabled={isSubmitting}
              {...register('lastName')}
            />
          </div>
          <input
            type="text"
            className="input bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Username"
            required
            disabled={isSubmitting}
            {...register('username')}
          />
          <input
            type="email"
            className="input bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Email"
            required
            disabled={isSubmitting}
            {...register('email')}
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="input bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-full"
              placeholder="Password (min 6 characters)"
              required
              disabled={isSubmitting}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="input bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-full"
              placeholder="Confirm Password"
              required
              disabled={isSubmitting}
              {...register('confirmPassword', {
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <select
            className="input bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
            {...register('role')}
            disabled={isSubmitting}
          >
            <option value="user">User</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>

          <button
            className={`btn flex items-center justify-center p-3 rounded-lg text-white font-semibold ${
              isSubmitting
                ? 'bg-gray-400'
                : 'bg-brand-primary_text hover:bg-brand-secondary'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader className="text-white animate-spin" />
            ) : (
              'Save'
            )}
          </button>

          {error && (
            <div className="p-3 font-semibold text-red-500 bg-red-50 rounded-md border dark:bg-red-800 dark:text-red-200">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
