import React from 'react';
import { Edit, Trash } from 'react-feather';

import { TableItem } from '../../components';
import useAuth from '../../hooks/useAuth';
import Content from '../../models/content/Content';

interface ContentTableRowsProps {
  data: Content[];
  setSelectedContentId: (id: string) => void;
  setUpdateShow: (show: boolean) => void;
  setDeleteShow: (show: boolean) => void;
  setValue: (field: string, value: string) => void;
}

const ContentTableRows: React.FC<ContentTableRowsProps> = ({
  data,
  setSelectedContentId,
  setUpdateShow,
  setDeleteShow,
  setValue,
}) => {
  const { authenticatedUser } = useAuth();

  return (
    <>
      {data.map(({ id, name, description, dateCreated }) => {
        const canEdit =
          authenticatedUser.role === 'admin' ||
          authenticatedUser.role === 'editor';

        return (
          <tr key={id} className="w-full">
            <TableItem>{name}</TableItem>
            <TableItem>{description}</TableItem>
            <TableItem>{new Date(dateCreated).toLocaleDateString()}</TableItem>
            <TableItem className="flex justify-center items-center">
              {canEdit && (
                <button
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-500 focus:outline-none"
                  onClick={() => {
                    setSelectedContentId(id);
                    setValue('name', name);
                    setValue('description', description);
                    setUpdateShow(true);
                  }}
                >
                  <Edit />
                </button>
              )}
              {authenticatedUser.role === 'admin' && (
                <button
                  className="text-brand-primary dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 focus:outline-none"
                  onClick={() => {
                    setSelectedContentId(id);
                    setDeleteShow(true);
                  }}
                >
                  <Trash />
                </button>
              )}
            </TableItem>
          </tr>
        );
      })}
    </>
  );
};

export default ContentTableRows;
