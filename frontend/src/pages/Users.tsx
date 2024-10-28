import React from 'react';
import { useEffect, useState } from 'react';
import { Plus, RefreshCw, User } from 'react-feather';
import { useQuery } from 'react-query';

import { Layout } from '../components';
import {
  AddUserModal,
  CustomButton,
  UserFilters,
  UsersTable,
} from '../components';
import useAuth from '../hooks/useAuth';
import CreateUserRequest from '../models/user/CreateUserRequest';
import userService from '../services/UserService';

const Users: React.FC = () => {
  const { authenticatedUser } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [addUserShow, setAddUserShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ['users', firstName, lastName, username, role],
    async () => {
      return (
        await userService.findAll({
          firstName: firstName.length >= 3 ? firstName : undefined,
          lastName: lastName.length >= 3 ? lastName : undefined,
          username: username.length >= 3 ? username : undefined,
          role: role || undefined,
        })
      ).filter((user) => user.id !== authenticatedUser.id);
    },
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (firstName || lastName || username || role) {
        refetch();
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [firstName, lastName, username, role, refetch]);

  const saveUser = async (createUserRequest: CreateUserRequest) => {
    setIsSubmitting(true);
    try {
      await userService.save(createUserRequest);
      setAddUserShow(false);
      setError(null);
      refetch();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Users" subtitle="Manage users" icon={<User />}>
      <div className="flex flex-col gap-2 justify-between my-5 sm:flex-row">
        <CustomButton
          text="Add User"
          onClick={() => setAddUserShow(true)}
          icon={<Plus />}
        />
        <CustomButton
          text="Reload"
          onClick={() => refetch()}
          icon={<RefreshCw />}
        />
      </div>

      <UserFilters
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        username={username}
        setUsername={setUsername}
        role={role}
        setRole={setRole}
      />

      {data && <UsersTable data={data} isLoading={isLoading} />}

      <AddUserModal
        show={addUserShow}
        onClose={() => setAddUserShow(false)}
        onSave={saveUser}
        isSubmitting={isSubmitting}
        error={error}
      />
    </Layout>
  );
};

export default Users;
