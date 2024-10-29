import { useMemo, useState } from 'react';
import { Loader } from 'react-feather';
import { useMutation, useQueryClient } from 'react-query';

import { PaginationControls, UpdateUserModal, UserRow } from '../../components';
import UpdateUserRequest from '../../models/user/UpdateUserRequest';
import User from '../../models/user/User';
import userService from '../../services/UserService';
import { CustomsTh } from './CustomsTh';
import DeleteUserModal from './DeleteUserModal';

interface UsersTableProps {
  data: User[];
  isLoading: boolean;
  totalItems: number;
  perPage: number;
}

export default function UsersTable({
  data,
  isLoading,
  totalItems,
  perPage,
}: UsersTableProps) {
  const [deleteShow, setDeleteShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const deleteUser = useMutation(
    (userId: string) => userService.delete(userId),
    {
      onSuccess: () => queryClient.invalidateQueries('users'),
    },
  );

  const updateUser = useMutation(
    ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      userService.update(id, data),
    {
      onSuccess: () => queryClient.invalidateQueries('users'),
    },
  );

  const sortedData = useMemo(() => {
    return data.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [data]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * 10,
    currentPage * 10,
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      {isLoading ? (
        <Loader className="mx-auto animate-spin" />
      ) : (
        <div className="overflow-x-auto w-full rounded-lg shadow">
          <table className="mt-3 w-full divide-y divide-gray-200 bg-brand-header_background dark:bg-dark-background">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <CustomsTh label="First Name" />
                <CustomsTh label="Last Name" />
                <CustomsTh label="Email" />
                <CustomsTh label="Status" />
                <CustomsTh label="Role" />
                <CustomsTh label="Actions" className=" text-center w-[120px]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={() => {
                    setSelectedUser(user);
                    setUpdateShow(true);
                  }}
                  onDelete={() => {
                    setSelectedUser(user);
                    setDeleteShow(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteUserModal
        show={deleteShow}
        isDeleting={deleteUser.isLoading}
        error={
          deleteUser.error instanceof Error ? deleteUser.error.message : ''
        }
        onClose={() => setDeleteShow(false)}
        onDelete={() => deleteUser.mutate(selectedUser?.id!)}
      />

      <UpdateUserModal
        show={updateShow}
        userData={
          selectedUser || {
            email: '',
            firstName: '',
            lastName: '',
            username: '',
            role: '',
            isActive: false,
          }
        }
        isSubmitting={updateUser.isLoading}
        error={
          updateUser.error instanceof Error ? updateUser.error.message : ''
        }
        onClose={() => setUpdateShow(false)}
        onSubmit={(data) => {
          updateUser.mutate({ id: selectedUser?.id!, data });
        }}
      />

      <PaginationControls
        fetchCourses={() => {}}
        currentPage={currentPage}
        perPage={5}
        hasNextPage={false}
        totalItems={totalItems}
      />
    </div>
  );
}
