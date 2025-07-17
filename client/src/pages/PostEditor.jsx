import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { postService, categoryService } from '@/services/api';
import { useToast } from '@/context/ToastContext';
import { useParams, useNavigate } from 'react-router-dom';
import useForm from '@/hooks/useForm';

const PostEditor = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { values, setValues, handleChange, reset } = useForm({
    title: '',
    excerpt: '',
    content: '',
    category: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await categoryService.getAllCategories();
        setCategories(cats);
      } catch (err) {
        showToast({ message: 'Failed to load categories.', type: 'error' });
      }
    };

    const fetchPost = async () => {
      if (!postId) return;
      try {
        const post = await postService.getPostById(postId);
        setValues({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category?.slug || '',
        });
      } catch (err) {
        showToast({ message: 'Error loading post.', type: 'error' });
      }
    };

    fetchCategories();
    fetchPost();
  }, [postId, setValues, showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (postId) {
        await postService.updatePost(postId, values);
        showToast({ message: 'Post updated successfully!', type: 'success' });
      } else {
        await postService.createPost(values);
        showToast({ message: 'Post created successfully!', type: 'success' });
        reset();
      }
      navigate('/');
    } catch (err) {
      showToast({
        message: err.response?.data?.message || 'Something went wrong.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        {postId ? 'Edit Post' : 'Create New Post'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Post Title"
          value={values.title}
          onChange={handleChange}
          required
        />
        <Textarea
          name="excerpt"
          placeholder="Short description"
          value={values.excerpt}
          onChange={handleChange}
          rows={2}
        />
        <Textarea
          name="content"
          placeholder="Main content"
          value={values.content}
          onChange={handleChange}
          rows={6}
        />
        <select
          name="category"
          value={values.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded bg-background"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Submitting...' : postId ? 'Update Post' : 'Create Post'}
        </Button>
      </form>
    </section>
  );
};

export default PostEditor;