import React from 'react';

interface UserFiltersProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  role,
  setRole,
}) => (
  <div className="mt-2 table-filter">
    <div className="flex flex-row gap-5">
      <input
        type="text"
        className="w-1/2 input"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        className="w-1/2 input"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
    <div className="flex flex-row gap-5 mt-3">
      <input
        type="text"
        className="w-1/2 input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <select
        className="w-1/2 input"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">All</option>
        <option value="user">User</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  </div>
);

export default UserFilters;
