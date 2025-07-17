import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ prevents redirect loop during hydration

  // 🔐 Login and persist user
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const loggedInUser = response.user;
      const token = response.token;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      navigate(loggedInUser.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      throw err;
    }
  };

  // 🚪 Logout and cleanup
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // 🧠 Restore user from localStorage on first load
  useEffect(() => {
    const fetchUser = () => {
      try {
        const stored = localStorage.getItem('user');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?._id) setUser(parsed);
        }
      } catch (err) {
        console.error('Failed to restore user:', err.message);
      } finally {
        setLoading(false); // ✅ hydrate complete
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);