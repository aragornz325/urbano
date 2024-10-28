import { useMemo, useState } from 'react';
import { Loader } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { PaginationControls, Table } from '../../components';
import { Course } from '../../models/course/Course';
import UpdateCourseRequest from '../../models/course/UpdateCourseRequest';
import courseService from '../../services/CourseService';
import { sortData } from '../../utils/sortFunction';
import CourseRow from './CourseRow';
import DeleteCourseModal from './DeleteCourseModal';
import UpdateCourseModal from './UpdateCourseModal';

interface UsersTableProps {
  data: Course[];
  isLoading: boolean;
  perPage: number;
  hasNextPage: boolean;
  fetchCourses: (page: number, perPage: number) => void;
  currentPage: number;
  refetch: () => void;
  totalItems: number;
}

export default function CoursesTable({
  data,
  isLoading,
  perPage,
  hasNextPage,
  fetchCourses,
  currentPage,
  refetch,
  totalItems,
}: UsersTableProps) {
  const queryClient = useQueryClient();
  const [selectedCourse, setSelectedCourse] = useState<Partial<Course> | null>(
    null,
  );
  const [deleteShow, setDeleteShow] = useState<boolean>(false);
  const [updateShow, setUpdateShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const { reset, formState } = useForm<UpdateCourseRequest>();

  const { mutate: deleteCourse } = useMutation(
    (courseId: string) => courseService.delete(courseId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('courses');
        setDeleteShow(false);
      },
      onError: (error: any) =>
        setError(error.response?.data?.message || 'Error al eliminar el curso'),
    },
  );

  const { mutate: updateCourse } = useMutation(
    (data: UpdateCourseRequest) =>
      courseService.update(selectedCourse?.id as string, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('courses');
        setUpdateShow(false);
        reset();
        setError(null);
      },
      onError: (error: any) =>
        setError(
          error.response?.data?.message || 'Error al actualizar el curso',
        ),
    },
  );

  const handleSort = (field: string) => {
    switch (field) {
      case 'created':
        field = 'dateCreated';
        break;
      case 'name':
        field = 'name';
        break;
      case 'description':
        field = 'description';
        break;
      default:
        break;
    }
    if (field === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(field);
      setOrder('asc');
    }
  };

  const dataSort = useMemo(() => {
    return sortData(data || [], orderBy, order);
  }, [data, orderBy, order]);

  return (
    <>
      <div className="table-container dark:bg-gray-800">
        <Table
          columns={['Name', 'Description', 'Image', 'Created']}
          orderBy={orderBy}
          order={order}
          onSort={handleSort}
        >
          {isLoading ? (
            <tr>
              <td colSpan={5}>
                <Loader className="mx-auto animate-spin" />
              </td>
            </tr>
          ) : dataSort.length ? (
            dataSort.map((course) => (
              <CourseRow
                key={`${currentPage}-${course.id}-${Math.random()}`}
                course={course}
                setDeleteShow={setDeleteShow}
                setUpdateShow={setUpdateShow}
                setSelectedCourse={setSelectedCourse}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No courses found.
              </td>
            </tr>
          )}
        </Table>
      </div>

      <DeleteCourseModal
        isOpen={deleteShow}
        onClose={() => setDeleteShow(false)}
        onDelete={() => deleteCourse(selectedCourse?.id!)}
        error={error}
      />
      <UpdateCourseModal
        show={updateShow}
        courseId={selectedCourse?.id}
        selectedName={selectedCourse?.name}
        selectedDescription={selectedCourse?.description}
        initialImageUrl={selectedCourse?.imageUrl}
        onClose={() => setUpdateShow(false)}
        error={error}
        onImageDelete={() => {}}
        refresh={refetch}
        isSubmitting={formState.isSubmitting}
      />

      <PaginationControls
        fetchCourses={fetchCourses}
        currentPage={currentPage}
        perPage={perPage}
        hasNextPage={hasNextPage}
        totalItems={totalItems}
      />
    </>
  );
}
