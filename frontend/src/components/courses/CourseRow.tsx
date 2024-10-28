import React from 'react';
import { Link } from 'react-router-dom';

import TableItem from '../shared/TableItem';

interface CourseRowProps {
  course: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    dateCreated: Date;
  };
  authenticatedUser: {
    role: string;
  };
  setDeleteShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateShow: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCourse: React.Dispatch<React.SetStateAction<any>>;
}

const CourseRow: React.FC<CourseRowProps> = ({
  course,
  authenticatedUser,
  setDeleteShow,
  setUpdateShow,
  setSelectedCourse,
}) => (
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

export default CourseRow;
