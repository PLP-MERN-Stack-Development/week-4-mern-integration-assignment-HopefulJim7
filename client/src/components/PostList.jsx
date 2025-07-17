import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

const PostList = ({ render }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (!posts.length)
    return <p className="text-muted-foreground">No posts available.</p>;

  return posts.map((post) =>
    render ? render(post) : (
      <Card key={post._id} className="border-2 border-blue-500 rounded-lg shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-2">
            {post.excerpt || post.content.slice(0, 100)}...
          </p>
          <Link to={`/posts/${post.slug}`} className="text-blue-600 hover:underline text-sm">
            Read more →
          </Link>
        </CardContent>
      </Card>
    )
  );
};

export default PostList;