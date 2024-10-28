import { useQuery } from 'react-query';

import { useTheme } from '../../context/ThemeContext';
import CourseService from '../../services/CourseService';
import { CourseItem } from '../index';

interface CourseCardProps {
  name?: string;
  description?: string;
  imageUrl?: string;
}

const CourseList: React.FC<CourseCardProps> = ({ name, description }) => {
  const { darkMode } = useTheme();
  const { data, isLoading, refetch } = useQuery(
    ['courses', name, description],
    () =>
      CourseService.findAll({
        name: name || undefined,
        description: description || undefined,
        sortBy: 'dateCreated',
        sortOrder: 'DESC',
        limit: 3,
      }),
  );
  const handleRefetch = () => {
    console.log('Refetching data in CourseCard...');
    refetch();
  };

  return (
    <section className="my-8">
      <h2 className="mb-5 text-2xl font-semibold">Últimos Cursos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : data && data.length > 0 ? (
          data.map((course) => (
            <CourseItem
              key={course.id}
              refetch={handleRefetch}
              course={{
                ...course,
                dateCreated: course.dateCreated,
                imageUrl: course.imageUrl,
              }}
            />
          ))
        ) : (
          <p className="text-center">No courses found.</p>
        )}
      </div>
    </section>
  );
};

export default CourseList;
