import { Home as HomeIcon } from 'react-feather';
import { useQuery } from 'react-query';

import { CourseList, Layout, StatCard } from '../components';
import WelcomeSection from '../components/home/Home';
import useAuth from '../hooks/useAuth';
import statsService from '../services/StatsService';

export default function Home() {
  const { authenticatedUser } = useAuth();
  const isAdmin = authenticatedUser.role === 'admin';

  const { data, isLoading } = useQuery('stats', statsService.getStats, {
    placeholderData: {
      numberOfUsers: 0,
      numberOfCourses: 0,
      numberOfContents: 0,
    },
  });

  return (
    <Layout
      title="Home"
      subtitle="Welcome to the dashboard"
      icon={<HomeIcon />}
    >
      <div className="flex flex-col gap-8 justify-around mt-8">
        {/* Sección de estadísticas principales */}
        <div className="flex flex-wrap gap-6 justify-center w-full md:w-auto">
          {isAdmin && (
            <StatCard
              color="bg-blue-500"
              value={data.numberOfUsers}
              label="Users"
              className="flex-grow max-w-full basis-1/3 md:max-w-1/3"
            />
          )}
          <StatCard
            color="bg-indigo-500"
            value={data.numberOfCourses}
            label="Courses"
            className="flex-grow max-w-full basis-1/3 md:max-w-1/3"
          />
          <StatCard
            color="bg-green-500"
            value={data.numberOfContents}
            label="Contents"
            className="flex-grow max-w-full basis-1/3 md:max-w-1/3"
          />
        </div>
        <WelcomeSection />
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
