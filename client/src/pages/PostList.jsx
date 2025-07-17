import { useEffect, useState } from 'react';
import { postService } from '@/services/api';
import PostCard from '@/components/PostCard';
import CategoryFilter from '@/components/CategoryFilter';
import Loader from '@/components/Loader';
import usePagination from '@/hooks/usePagination';
import { Button } from '@/components/ui/button';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorySlug, setCategorySlug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await postService.getAllPosts(); // Fetch full set
        const filtered = categorySlug
          ? data.posts.filter((p) => p.category?.slug === categorySlug)
          : data.posts;
        setPosts(filtered || []);
        setCurrentPage(1); // reset page on category change
      } catch (err) {
        console.error('Failed to load posts:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categorySlug]);

  const { pageData, totalPages } = usePagination(posts, currentPage, 6);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Civic Posts</h2>

      <CategoryFilter onSelect={setCategorySlug} />

      {loading ? (
        <Loader message="Fetching posts..." type="shadcn" />
      ) : posts.length ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {pageData.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-muted-foreground mt-6">No posts found for this category.</p>
      )}
    </section>
  );
};

export default PostList;