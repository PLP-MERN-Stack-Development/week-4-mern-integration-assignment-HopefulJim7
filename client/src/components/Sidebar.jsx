import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils'; // Tailwind class merge helper (optional)

const links = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Manage Posts', path: '/admin/posts' },
  { label: 'Edit Categories', path: '/admin/categories' },
  { label: 'Edit Tags', path: '/admin/tags' },
];

const Sidebar = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') return null;

  return (
    <aside className="w-64 border-r px-4 py-6 hidden lg:block">
      <div className="text-xl font-bold text-primary mb-6">Admin Panel</div>
      <nav className="space-y-2 text-sm">
        {links.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'block px-3 py-2 rounded hover:bg-muted transition-all',
                isActive && 'bg-muted font-semibold text-primary'
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;