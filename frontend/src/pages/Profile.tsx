import { useState } from 'react';
import { Loader, User } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import { Layout } from '../components';
import Avatar from '../components/Profile/Avatar'; // Importa el nuevo componente Avatar
import useAuth from '../hooks/useAuth';
import UpdateUserRequest from '../models/user/UpdateUserRequest';
import userService from '../services/UserService';

export default function UpdateProfile() {
  const { authenticatedUser } = useAuth();
  const [error, setError] = useState<string>();

  const { data, isLoading, refetch } = useQuery(
    `user-${authenticatedUser.id}`,
    () => userService.findOne(authenticatedUser.id),
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = useForm<UpdateUserRequest & { confirmPassword?: string }>();

  const handleUpdateUser = async (updateUserRequest: UpdateUserRequest) => {
    try {
      if (updateUserRequest.username === data.username) {
        delete updateUserRequest.username;
      }
      await userService.update(authenticatedUser.id, updateUserRequest);
      setError(null);
      setValue('password', '');
      setValue('confirmPassword', '');
      refetch();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const password = watch('password'); // Aquí estamos usando watch para observar el campo de password

  const handleAvatarClick = () => {
    console.log('Change avatar clicked');
  };

  if (!isLoading) {
    return (
      <Layout title="Profile" subtitle="Update your profile" icon={<User />}>
        <div className="p-6 mx-auto w-full max-w-md rounded-lg shadow-lg transition-all duration-300 bg-brand-header_background card dark:bg-gray-900 dark:text-white">
          <form
            className="flex flex-col gap-5 justify-center items-center mx-auto mt-3"
            onSubmit={handleSubmit(handleUpdateUser)}
          >
            <div className="relative">
              <Avatar onClick={handleAvatarClick} />
            </div>
            <h1 className="mb-5 text-3xl font-bold text-center">{`Welcome, ${data.firstName}`}</h1>
            <hr className="mb-5 w-full border-gray-200 dark:border-gray-700" />

            <div className="flex gap-3 w-full">
              <div className="w-1/2">
                <label className="block mb-2 font-semibold text-gray-600 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 input dark:border-gray-700 dark:bg-gray-800"
                  defaultValue={data.firstName}
                  disabled={isSubmitting}
                  placeholder="First Name"
                  {...register('firstName')}
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-semibold text-gray-600 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 input dark:border-gray-700 dark:bg-gray-800"
                  defaultValue={data.lastName}
                  disabled={isSubmitting}
                  placeholder="Last Name"
                  {...register('lastName')}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block mb-2 font-semibold text-gray-600 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 input dark:border-gray-700 dark:bg-gray-800"
                defaultValue={data.username}
                disabled={isSubmitting}
                placeholder="Username"
                {...register('username')}
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 font-semibold text-gray-600 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 input dark:border-gray-700 dark:bg-gray-800"
                placeholder="Password (min 6 characters)"
                disabled={isSubmitting}
                {...register('password', { minLength: 6 })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block mb-2 font-semibold text-gray-600 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 input dark:border-gray-700 dark:bg-gray-800"
                placeholder="Confirm Password"
                disabled={isSubmitting}
                {...register('confirmPassword', {
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              className="px-4 py-2 mt-3 w-full font-semibold text-white bg-blue-600 rounded-md transition-all duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader className="mx-auto animate-spin" />
              ) : (
                'Update'
              )}
            </button>
            {error && (
              <div className="p-3 font-semibold text-red-500 bg-red-50 rounded-md border dark:bg-red-800 dark:text-red-200">
                {error}
              </div>
            )}
          </form>
        </div>
      </Layout>
    );
  }

  return null;
}
