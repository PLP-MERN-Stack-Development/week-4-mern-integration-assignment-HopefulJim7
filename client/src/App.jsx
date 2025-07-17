import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import PostList from '@/pages/PostList';
import PostPreview from '@/pages/PostPreview';
import PostEditor from '@/pages/PostEditor';
import CreatePost from '@/pages/CreatePost';
import Profile from '@/pages/Profile';

import AdminDashboard from '@/pages/admin/AdminDashboard';
import CategoryEditor from '@/pages/admin/CategoryEditor';
import TagEditor from '@/pages/admin/TagEditor';
import PostManager from '@/pages/admin/PostManager';

import AuthForm from '@/components/AuthForm';
import ProtectedRoute from '@/routes/ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import NotFound from '@/pages/NotFound';
import PostDetails from '@/pages/PostDetails';

import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              {/* 🔓 Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/:slug" element={<PostPreview />} />
              <Route path="/login" element={<AuthForm mode="login" />} />
              <Route path="/signup" element={<AuthForm mode="signup" />} />

              {/* 🔐 Authenticated User Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/edit/:postId" element={<PostEditor />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* 🛡️ Admin Dashboard Routes */}
              <Route element={<ProtectedRoute roles={['admin']} />}>
                <Route path="/admin" element={<DashboardLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="tags" element={<TagEditor />} />
                  <Route path="categories" element={<CategoryEditor />} />
                  <Route path="posts" element={<PostManager />} />
                </Route>
              </Route>

              {/* 📘 Full Post Detail with Comments */}
              <Route path="/blog/:id" element={<PostDetails />} />

              {/* 🚫 Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;