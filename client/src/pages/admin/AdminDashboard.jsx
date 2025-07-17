import { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService'; // 👈 now using adminService
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ posts: 0, categories: 0, tags: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDashboardStats(); // 👈 secure API call
        setStats(data.stats); // expected shape: { posts, categories, tags }
      } catch (err) {
        console.error('Failed to load admin stats:', err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Link to="/admin/posts">
        <Card className="hover:bg-muted cursor-pointer">
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>{stats.posts} total posts</CardContent>
        </Card>
      </Link>

      <Link to="/admin/categories">
        <Card className="hover:bg-muted cursor-pointer">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>{stats.categories} listed</CardContent>
        </Card>
      </Link>

      <Link to="/admin/tags">
        <Card className="hover:bg-muted cursor-pointer">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>{stats.tags} used</CardContent>
        </Card>
      </Link>
    </section>
  );
};

export default AdminDashboard;