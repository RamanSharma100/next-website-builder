'use client';

import { useSession } from '@clerk/nextjs';

const DashboardPage = () => {
  const { session } = useSession();

  const user = session?.user;

  return (
    <h1>
      Welcome to the dashboard:{' '}
      <strong>{user?.firstName + ' ' + user?.lastName}</strong>
    </h1>
  );
};

export default DashboardPage;
