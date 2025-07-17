import { useEffect, useState } from 'react';
import { postService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/context/ToastContext';
import { Link } from 'react-router-dom';
import useModal from '@/hooks/useModal';
import ConfirmModal from '@/components/ConfirmModal';
import usePagination from '@/hooks/usePagination';

const PostManager = () => {
  const { showToast } = useToast();
  const [posts, setPosts] = useState([]);
  const [targetPost, setTargetPost] = useState(null);
  const { isOpen, open, close } = useModal();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async () => {
    try {
      const data = await postService.getAllPosts();
      setPosts(data || []);
    } catch {
      showToast({ message: 'Failed to load posts.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const confirmDelete = (post) => {
    setTargetPost(post);
    open();
  };

  const handleDelete = async () => {
    try {
      await postService.deletePost(targetPost._id);
      showToast({ message: 'Post deleted.', type: 'success' });
      fetchPosts();
    } catch {
      showToast({ message: 'Delete failed.', type: 'error' });
    } finally {
      close();
    }
  };

  const { pageData, totalPages } = usePagination(posts, currentPage, 8);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Manage Posts</h2>

      {pageData.length ? (
        <ul className="divide-y border rounded-md">
          {pageData.map((post) => (
            <li key={post._id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-semibold">{post.title}</p>
                <p className="text-sm text-muted-foreground">
                  {post.category?.name || 'Uncategorized'}
                </p>
              </div>
              <div className="flex gap-2">
                <Link to={`/edit/${post._id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => confirmDelete(post)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No posts found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Modal */}
      {targetPost && (
        <ConfirmModal
          isOpen={isOpen}
          close={close}
          onConfirm={handleDelete}
          title="Delete this post?"
          message={`Post: "${targetPost.title}"`}
          confirmText="Delete"
        />
      )}
    </div>
  );
};

export default PostManager;