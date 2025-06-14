import Link from 'next/link';
import { Home, LayoutDashboard, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-muted p-4 space-y-2">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Home size={20} /> Dashboard
      </Link>
      <Link href="/dashboard/projects" className="flex items-center gap-2">
        <LayoutDashboard size={20} /> Projects
      </Link>
      <Link href="/dashboard/settings" className="flex items-center gap-2">
        <Settings size={20} /> Settings
      </Link>
    </aside>
  );
};

export default Sidebar;
