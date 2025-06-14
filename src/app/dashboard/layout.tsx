import { ClerkService } from '@/services/clerk';
import { DashboardLayout as DashboardLayoutComponent } from '@/components/dashboard';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await ClerkService.syncUser();

  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
};

export default DashboardLayout;
