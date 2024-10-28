import { Home } from 'react-feather';
import { useQuery } from 'react-query';

import { CourseList, Layout, StatCard } from '../components';
import useAuth from '../hooks/useAuth';
import statsService from '../services/StatsService';

export default function Dashboard() {
  const { authenticatedUser } = useAuth();
  const isAdmin = authenticatedUser.role === 'admin';

  // Simulación de datos en caso de que aún esté cargando
  const { data, isLoading } = useQuery('stats', statsService.getStats, {
    placeholderData: {
      numberOfUsers: 0,
      numberOfCourses: 0,
      numberOfContents: 0,
    },
  });

  return (
    <Layout
      title="Dashboard"
      subtitle="Welcome to the dashboard"
      icon={<Home />}
    >
      <div className="flex flex-col gap-8 items-center mt-8">
        {/* Sección de estadísticas principales */}
        <div className="flex flex-wrap gap-6 justify-center w-full md:w-auto">
          {isAdmin && (
            <StatCard
              color="bg-blue-500"
              value={data.numberOfUsers}
              label="Users"
            />
          )}
          <StatCard
            color="bg-indigo-500"
            value={data.numberOfCourses}
            label="Courses"
          />
          <StatCard
            color="bg-green-500"
            value={data.numberOfContents}
            label="Contents"
          />
        </div>

        {/* Sección de lista de cursos */}
        <div className="mt-10 w-4/5">
          <h2 className="mb-4 text-xl font-semibold text-center dark:text-white">
            Recent Courses
          </h2>
          <CourseList />
        </div>
      </div>
    </Layout>
  );
}
