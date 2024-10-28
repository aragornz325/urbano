import { useState } from 'react';
import { Loader, User } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import { Layout, ThemeButton } from '../components';
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
    formState: { isSubmitting },
    setValue,
  } = useForm<UpdateUserRequest>();

  const handleUpdateUser = async (updateUserRequest: UpdateUserRequest) => {
    try {
      if (updateUserRequest.username === data.username) {
        delete updateUserRequest.username;
      }
      await userService.update(authenticatedUser.id, updateUserRequest);
      setError(null);
      setValue('password', '');
      refetch();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  if (!isLoading) {
    return (
      <Layout title="Profile" subtitle="Update your profile" icon={<User />}>
        <div className="p-6 shadow-lg card dark:text-white">
          <form
            className="flex flex-col gap-5 justify-center items-center mx-auto mt-3 md:w-1/2 lg:w-1/3"
            onSubmit={handleSubmit(handleUpdateUser)}
          >
            <h1 className="mb-5 text-4xl font-semibold text-center">{`Welcome, ${data.firstName}`}</h1>
            <hr className="w-full" />
            <div className="flex gap-3 w-full">
              <div className="w-1/2">
                <label className="block mb-2 font-semibold">First Name</label>
                <input
                  type="text"
                  className="w-full input"
                  defaultValue={data.firstName}
                  disabled={isSubmitting}
                  placeholder="First Name"
                  {...register('firstName')}
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-semibold">Last Name</label>
                <input
                  type="text"
                  className="w-full input"
                  defaultValue={data.lastName}
                  disabled={isSubmitting}
                  placeholder="Last Name"
                  {...register('lastName')}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block mb-2 font-semibold">Username</label>
              <input
                type="text"
                className="w-full input"
                defaultValue={data.username}
                disabled={isSubmitting}
                placeholder="Username"
                {...register('username')}
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 font-semibold">Password</label>
              <input
                type="password"
                className="w-full input"
                placeholder="Password (min 6 characters)"
                disabled={isSubmitting}
                {...register('password')}
              />
            </div>
            <button className="w-full btn" disabled={isSubmitting}>
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
