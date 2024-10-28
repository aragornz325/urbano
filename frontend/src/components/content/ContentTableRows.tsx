import React from 'react';

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
      {data.map(({ id, name, description, dateCreated, createdBy }) => {
        console.log(createdBy, dateCreated);
        const canEdit =
          authenticatedUser.role === 'admin' ||
          (authenticatedUser.role === 'editor' &&
            authenticatedUser.id === createdBy);

        return (
          <tr key={id}>
            <TableItem>{name}</TableItem>
            <TableItem>{description}</TableItem>
            <TableItem>{new Date(dateCreated).toLocaleDateString()}</TableItem>
            <TableItem className="text-right">
              {canEdit && (
                <button
                  className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                  onClick={() => {
                    setSelectedContentId(id);
                    setValue('name', name);
                    setValue('description', description);
                    setUpdateShow(true);
                  }}
                >
                  Edit
                </button>
              )}
              {authenticatedUser.role === 'admin' && (
                <button
                  className="ml-3 text-brand-primary hover:text-red-900 focus:outline-none"
                  onClick={() => {
                    setSelectedContentId(id);
                    setDeleteShow(true);
                  }}
                >
                  Delete
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
