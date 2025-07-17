import { Outlet, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar'; 
import { cn } from '@/lib/utils'; // Handy for conditional styling

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r px-4 py-6 hidden lg:block">
        <div className="text-xl font-bold text-primary mb-6">Admin Panel</div>
        <nav className="space-y-2 text-sm">
          {/* Replace below with <Sidebar /> once ready */}
          <Link to="/admin" className="block hover:text-primary">Dashboard</Link>
          <Link to="/admin/posts" className="block hover:text-primary">Manage Posts</Link>
          <Link to="/admin/categories" className="block hover:text-primary">Edit Categories</Link>
          <Link to="/admin/tags" className="block hover:text-primary">Edit Tags</Link>
        </nav>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;