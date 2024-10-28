import React from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { Course } from '../../models/course/Course';
import TableItem from '../shared/TableItem';

interface CourseRowProps {
  course: Course;
  setDeleteShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateShow: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCourse: React.Dispatch<React.SetStateAction<any>>;
}

const CourseRow: React.FC<CourseRowProps> = ({
  course,
  setDeleteShow,
  setUpdateShow,
  setSelectedCourse,
}) => {
  const { authenticatedUser } = useAuth();
  const canEdit =
    authenticatedUser.role === 'admin' ||
    (authenticatedUser.role === 'editor' &&
      authenticatedUser.id === course.createdBy.id);

  return (
    <tr>
      <TableItem>
        <Link to={`/courses/${course.id}`}>{course.name}</Link>
      </TableItem>
      <TableItem>{course.description}</TableItem>
      <TableItem className="text-center">
        <img
          src={course.imageUrl || '/favicon.png'}
          alt={course.name}
          className="object-cover w-16 h-16 rounded-full"
        />
      </TableItem>
      <TableItem>{new Date(course.dateCreated).toLocaleDateString()}</TableItem>
      <TableItem className="text-right">
        {['admin', 'editor'].includes(authenticatedUser.role) && (
          <button
            onClick={() => {
              setSelectedCourse(course);
              setUpdateShow(true);
            }}
            disabled={!canEdit}
            title={!canEdit ? 'No tienes permisos para editar' : ''}
            className={!canEdit ? 'text-gray-400 cursor-not-allowed' : ''}
          >
            Edit
          </button>
        )}
        {authenticatedUser.role === 'admin' && (
          <button
            onClick={() => {
              setSelectedCourse(course);
              setDeleteShow(true);
            }}
          >
            Delete
          </button>
        )}
      </TableItem>
    </tr>
  );
};

export default CourseRow;
