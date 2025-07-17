import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';

const CommentForm = ({ postId, onCommentPosted }) => {
  const { user } = useAuth();
  const [author, setAuthor] = useState(user?.username || '');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(
        '/api/comments',
        { postId, author: author || 'Anonymous', text },
        { withCredentials: true }
      );
      setText('');
      if (!user) setAuthor('');
      if (onCommentPosted) onCommentPosted();
    } catch (err) {
      setError('Failed to post comment');
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {!user && (
        <Input
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      )}
      <Textarea
        placeholder="Write your comment…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Posting…' : 'Post Comment'}
      </Button>
    </form>
  );
};

export default CommentForm;