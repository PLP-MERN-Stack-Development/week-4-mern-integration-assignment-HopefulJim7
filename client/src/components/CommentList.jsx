import { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const CommentList = ({ postId, refreshKey }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${postId}`, {
        withCredentials: true,
      });
      setComments(res.data);
    } catch (err) {
      console.error('Failed to load comments:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId, refreshKey]); // ✅ now re-fetches when key changes

  if (loading) {
    return (
      <div className="space-y-2 mt-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    );
  }

  if (comments.length === 0) {
    return <p className="text-sm text-muted-foreground mt-4">No comments yet.</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      {comments.map((comment) => (
        <Card key={comment._id} className="p-4 bg-muted">
          <p className="text-sm text-muted-foreground mb-1">
            <span className="font-semibold">{comment.author}</span> ·{' '}
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
          <p className="text-base text-foreground">{comment.text}</p>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;