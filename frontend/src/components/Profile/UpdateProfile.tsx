// UpdateProfile.tsx
import { useState } from 'react';
import { User } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

import {
  ErrorMessage,
  Layout,
  ProfileHeader,
  UpdateProfileForm,
} from '../../components';
import useAuth from '../../hooks/useAuth';
import UpdateUserRequest from '../../models/user/UpdateUserRequest';
import userService from '../../services/UserService';

export default function UpdateProfile() {
  const { authenticatedUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const { data, isLoading, refetch } = useQuery(
    `user-${authenticatedUser.id}`,
    () => userService.findOne(authenticatedUser.id),
  );

  const { register, handleSubmit, formState, setValue } =
    useForm<UpdateUserRequest>();

  const handleUpdateUser = async (updateUserRequest: UpdateUserRequest) => {
    try {
      if (updateUserRequest.username === data.username) {
        delete updateUserRequest.username;
      }
      await userService.update(authenticatedUser.id, updateUserRequest);
      setError(null);
      setValue('password', '');
      refetch();
      history.push('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating profile');
    }
  };

  if (!isLoading) {
    return (
      <Layout title="Profile" icon={<User />}>
        <ProfileHeader username={data.firstName} />
        <div className="p-6 shadow-lg card dark:text-white">
          <UpdateProfileForm
            data={data}
            register={register}
            handleSubmit={handleSubmit}
            handleUpdateUser={handleUpdateUser}
            isSubmitting={formState.isSubmitting}
          />
          {error && <ErrorMessage message={error} />}
        </div>
      </Layout>
    );
  }

  return null;
}
