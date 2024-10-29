import { useMemo, useState } from 'react';

import { Table } from '../../components';
import {
  ContentTableRows,
  DeleteContentModal,
  UpdateContentModal,
} from '../../components';
import Content from '../../models/content/Content';
import contentService from '../../services/ContentService';
import { sortData } from '../../utils/sortFunction';

interface ContentsTableProps {
  data: Content[];
  courseId: string;
  isLoading: boolean;
}

export default function ContentsTable({
  data,
  isLoading,
  courseId,
}: ContentsTableProps) {
  const [deleteShow, setDeleteShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string>();
  const [error, setError] = useState<string>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado de ordenación
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await contentService.delete(courseId, selectedContentId);
      setDeleteShow(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting content');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (data) => {
    setIsSubmitting(true);
    try {
      await contentService.update(courseId, selectedContentId, data);
      setUpdateShow(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating content');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSort = (field: string) => {
    let orderField;

    switch (field) {
      case 'created':
        orderField = 'dateCreated';
        break;
      case 'name':
        orderField = 'name';
        break;
      case 'description':
        orderField = 'description';
        break;
      default:
        orderField = field;
        break;
    }

    if (orderField === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(orderField);
      setOrder('asc');
    }
  };

  const sortedData = useMemo(
    () => sortData(data, orderBy, order),
    [data, orderBy, order],
  );

  return (
    <>
      <div className="w-full dark:bg-gray-800">
        <Table
          columns={['Name', 'Description', 'Created']}
          orderBy={orderBy}
          order={order}
          onSort={handleSort}
        >
          {isLoading ? (
            <tr>
              <td colSpan={4} className="py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : (
            <ContentTableRows
              data={sortedData}
              setSelectedContentId={setSelectedContentId}
              setUpdateShow={setUpdateShow}
              setDeleteShow={setDeleteShow}
              setValue={(field, value) => {}}
            />
          )}
        </Table>
      </div>

      <DeleteContentModal
        show={deleteShow}
        onClose={() => setDeleteShow(false)}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        error={error}
      />

      <UpdateContentModal
        show={updateShow}
        onClose={() => setUpdateShow(false)}
        onSubmit={handleUpdate}
        isSubmitting={isSubmitting}
        error={error}
      />
    </>
  );
}
