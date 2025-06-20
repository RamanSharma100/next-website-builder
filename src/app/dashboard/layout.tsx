import { UserService } from '@/services/user';
import { DashboardLayout as DashboardLayoutComponent } from '@/components/dashboard';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await UserService.syncUser();

  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
};

export default DashboardLayout;
