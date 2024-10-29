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
    <section className="mx-auto my-8 max-w-screen-xxl">
      <h2 className="mb-5 text-2xl font-semibold text-center">
        Últimos Cursos
      </h2>
      <div className="flex overflow-x-auto gap-4 justify-center px-4">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : data?.courses && data.courses.length > 0 ? (
          data.courses.map((course) => (
            <div
              key={course.id}
              className="flex-shrink-0 w-80 sm:w-1/2 lg:w-1/3"
            >
              <CourseItem
                refetch={handleRefetch}
                course={{
                  ...course,
                  createdAt: course.dateCreated,
                  imageUrl: course.imageUrl,
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-center">No courses found.</p>
        )}
      </div>
    </section>
  );
};

export default CourseList;
