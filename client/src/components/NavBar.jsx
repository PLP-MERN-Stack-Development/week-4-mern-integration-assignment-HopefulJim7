import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // ShadCN button
import  ModeToggle  from '@/components/ui/mode-toggle'; // optional theme switcher
import { authService } from '@/services/api';

const NavBar = () => {
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <nav className="w-full border-b bg-background px-4 py-2 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo / Title */}
        <Link to="/" className="text-xl font-bold text-primary hover:opacity-80">
          CivicHub
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium hover:text-muted-foreground">
            Home
          </Link>
          <Link to="/categories" className="text-sm font-medium hover:text-muted-foreground">
            Categories
          </Link>
          {user?.role === 'admin' || user?.role === 'editor' ? (
            <Link to="/dashboard" className="text-sm font-medium hover:text-muted-foreground">
              Dashboard
            </Link>
          ) : null}
        </div>

        {/* Auth + Theme */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          ) : (
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;