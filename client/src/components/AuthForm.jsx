import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // ✅ get setUser from context

const AuthForm = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const { setUser } = useAuth(); // ✅ updates user in global context

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isDev = import.meta.env.DEV;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // ✅ ensures session cookies are sent
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error('Login failed');
        const data = await res.json();
        setUser(data.user); // ✅ persist user after login
        navigate('/');
      } else {
        await authService.register(formData);
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-card p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">
        {isLogin ? 'Login to your account' : 'Create a new account'}
      </h2>

      {!isLogin && (
        <>
          <label htmlFor="username" className="text-sm font-medium text-foreground">
            Username
          </label>
          <Input
            id="username"
            name="username"
            autoComplete="username"
            autoFocus
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </>
      )}

      <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus={isLogin}
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete={isLogin ? 'current-password' : 'new-password'}
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {!isLogin && isDev && (
        <>
          <label htmlFor="role" className="text-sm font-medium text-foreground">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 bg-muted text-muted-foreground"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
      </Button>

      <p className="text-sm text-center mt-4">
        {isLogin ? (
          <>
            Don’t have an account?{' '}
            <Link to="/signup" className="text-primary underline">Sign up</Link>
          </>
        ) : (
          <>
            Already registered?{' '}
            <Link to="/login" className="text-primary underline">Log in</Link>
          </>
        )}
      </p>
    </form>
  );
};

export default AuthForm;