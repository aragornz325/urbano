import React from 'react';

import { TableItem } from '../../components';

interface UserRowProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    isActive: boolean;
    role: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onEdit, onDelete }) => (
  <tr>
    <TableItem>{`${user.firstName} ${user.lastName}`}</TableItem>
    <TableItem>{user.username}</TableItem>
    <TableItem>{user.email}</TableItem>
    <TableItem>
      {user.isActive ? (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          Active
        </span>
      ) : (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
          Inactive
        </span>
      )}
    </TableItem>
    <TableItem>{user.role}</TableItem>
    <TableItem className="text-right">
      <button
        className="text-indigo-600 hover:text-indigo-900"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="ml-3 text-red-600 hover:text-red-900"
        onClick={onDelete}
      >
        Delete
      </button>
    </TableItem>
  </tr>
);

export default UserRow;
