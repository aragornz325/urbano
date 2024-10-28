import React from 'react';
import { Loader } from 'react-feather';

import User from '../../models/user/User';

interface UsersTableProps {
  data: User[] | undefined;
  isLoading: boolean;
}

export const UsersTableList: React.FC<UsersTableProps> = ({
  data,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-5">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="p-5 text-center">No users found.</div>;
  }

  return (
    <table className="mt-5 w-full table-auto">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
