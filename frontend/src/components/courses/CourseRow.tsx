import React from 'react';
import { Edit, Trash } from 'react-feather'; // Importamos los iconos
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
    authenticatedUser.role === 'admin' || authenticatedUser.role === 'editor';

  return (
    <tr className="dark:bg-gray-800">
      <TableItem className="px-6 py-4">
        <Link to={`/courses/${course.id}`} className="hover:underline">
          {course.name}
        </Link>
      </TableItem>
      <TableItem className="px-6 py-4">{course.description}</TableItem>
      <TableItem className="px-6 py-4 text-center">
        <img
          src={course.imageUrl || '/favicon.png'}
          alt={course.name}
          className="object-cover w-16 h-16 rounded-full"
        />
      </TableItem>
      <TableItem className="px-6 py-4">
        {new Date(course.dateCreated).toLocaleDateString()}
      </TableItem>
      <TableItem className="flex gap-4 justify-end items-center px-6 py-4 text-right">
        {['admin', 'editor'].includes(authenticatedUser.role) && (
          <button
            onClick={() => {
              setSelectedCourse(course);
              setUpdateShow(true);
            }}
            disabled={!canEdit}
            title={!canEdit ? 'No tienes permisos para editar' : 'Editar curso'}
            className={
              !canEdit
                ? 'text-gray-400 cursor-not-allowed'
                : 'hover:text-blue-500'
            }
          >
            <Edit size={18} />
          </button>
        )}
        {authenticatedUser.role === 'admin' && (
          <button
            onClick={() => {
              setSelectedCourse(course);
              setDeleteShow(true);
            }}
            title="Eliminar curso"
            className="hover:text-red-500"
          >
            <Trash size={18} />
          </button>
        )}
      </TableItem>
    </tr>
  );
};

export default CourseRow;
