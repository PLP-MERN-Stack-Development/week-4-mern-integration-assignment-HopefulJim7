import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ roles = [], children }) => {
  const { user, loading } = useAuth();

  const isLoggedIn = !!user?._id;
  const userRole = user?.role || null;
  const roleAllowed = roles.length === 0 || roles.includes(userRole);

  // 🧠 Wait for auth state to hydrate before checking access
  if (loading) return null; // 🔄 Optionally return a <Spinner /> or fallback here

  // 🔐 Not logged in
  if (!isLoggedIn) {
    // console.warn('Redirecting: not logged in');
    return <Navigate to="/login" replace />;
  }

  // ⛔ Role-based access control
  if (!roleAllowed) {
    // console.warn(`Redirecting: user role (${userRole}) not allowed`);
    return <Navigate to="/" replace />;
  }

  // 🧠 Render inline JSX if passed
  if (children) return children;

  // 📦 Render nested route element
  return <Outlet />;
};

export default ProtectedRoute;