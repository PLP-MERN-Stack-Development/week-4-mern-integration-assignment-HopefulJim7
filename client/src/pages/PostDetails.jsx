import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`, { withCredentials: true });
      setPost(res.data);
    } catch (err) {
      setError('Failed to load post');
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  if (loading) return <p className="mt-6">Loading post…</p>;
  if (error) return <p className="mt-6 text-destructive">{error}</p>;
  if (!post) return <p className="mt-6">Post not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <Link to="/" className="text-sm text-primary hover:underline">← Back to posts</Link>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-muted-foreground">{post.body}</p>

      <CommentForm postId={post._id} onCommentPosted={handleRefresh} />
      <CommentList postId={post._id} refreshKey={refreshKey} />
    </div>
  );
};

export default PostDetails;