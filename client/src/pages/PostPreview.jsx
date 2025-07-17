import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postService } from '@/services/api';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import ReactMarkdown from 'react-markdown';
import useModal from '@/hooks/useModal';
import ConfirmModal from '@/components/ConfirmModal';
import { useToast } from '@/context/ToastContext';

const PostPreview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isOpen, open, close } = useModal();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        showToast({ message: 'Failed to load post.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, showToast]);

  const handleDelete = async () => {
    try {
      await postService.deletePost(post._id);
      showToast({ message: 'Post deleted.', type: 'success' });
      navigate('/');
    } catch (err) {
      showToast({ message: 'Delete failed.', type: 'error' });
    }
  };

  if (loading) return <Loader message="Loading post..." type="lucide" />;
  if (!post) return <p className="text-muted-foreground">Post not found.</p>;

  const { title, excerpt, content, category, tags, author, createdAt, _id } = post;

  return (
    <article className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <header>
        <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
        <p className="text-muted-foreground">{excerpt}</p>
        <p className="text-sm text-muted-foreground">
          By {author?.username || 'Anonymous'} • {formatDistanceToNow(new Date(createdAt))} ago
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary">{category?.name || 'Uncategorized'}</Badge>
          {tags?.map((tag, i) => (
            <Badge key={i} variant="outline">{tag}</Badge>
          ))}
        </div>
      </header>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Link to={`/edit/${_id}`}>
          <Button variant="outline">Edit Post</Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() =>
            navigator.share?.({
              title,
              text: excerpt,
              url: window.location.href,
            })
          }
        >
          Share
        </Button>
        <Button variant="destructive" onClick={open}>
          Delete
        </Button>
      </div>

      {/* Markdown Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isOpen}
        close={close}
        onConfirm={handleDelete}
        title="Delete this post?"
        message="This action cannot be undone."
        confirmText="Yes, delete it"
      />
    </article>
  );
};

export default PostPreview;