'use client';

import { useAuthenticate } from '@/hooks';

const DashboardPage = () => {
  const { user } = useAuthenticate();

  return (
    <h1>
      Welcome to the dashboard: <strong>{user?.email}</strong>
    </h1>
  );
};

export default DashboardPage;
