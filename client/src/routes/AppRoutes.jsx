import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

// 🌍 Public Pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import PostList from '@/pages/PostList';
import PostPreview from '@/pages/PostPreview';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup'; // optional addition

// ✏️ Auth-Protected Pages
import CreateBlog from '@/pages/CreateBlog';

// 🛡️ Admin Pages (Nested)
import AdminDashboard from '@/pages/admin/AdminDashboard';
import TagEditor from '@/pages/admin/TagEditor';
import CategoryEditor from '@/pages/admin/CategoryEditor';
import PostManager from '@/pages/admin/PostManager';
import PostDetails from '@/pages/PostDetails';


const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌍 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blog" element={<PostList />} />
      <Route path="/blog/:slug" element={<PostPreview />} />

      {/* 📝 Blog Creation - Protected by Role */}
      <Route
        path="/blog/new"
        element={
          <ProtectedRoute roles={['admin', 'editor']}>
            <CreateBlog />
          </ProtectedRoute>
        }
      />

      
     <Route path="/posts/:id" element={<PostDetails />} />


      {/* 🛡️ Admin Routes */}
      <Route
        path="/admin"
        element={<ProtectedRoute roles={['admin']} />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="tags" element={<TagEditor />} />
        <Route path="categories" element={<CategoryEditor />} />
        <Route path="posts" element={<PostManager />} />
      </Route>

      {/* 🚫 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;