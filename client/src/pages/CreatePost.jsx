import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import categoryService from '@/services/categoryService';
import { useAuth } from '@/context/AuthContext';

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublished, setIsPublished] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();
  const slug = useMemo(() => generateSlug(title), [title]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAll();
        setCategories(res);
      } catch (err) {
        console.error('Error loading categories:', err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert('Please log in to create a post.');
      console.error('User is not logged in or missing ID');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('content', content);
    formData.append('excerpt', excerpt || content.slice(0, 180));
    formData.append('category', category);
    formData.append('author', user._id);
    formData.append('isPublished', isPublished);
    if (image) formData.append('image', image);
    tags.split(',').forEach(tag =>
      formData.append('tags[]', tag.trim().toLowerCase())
    );

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (res.ok) {
        const newPost = await res.json();
        navigate(`/posts/${newPost.slug}`);
      } else {
        console.error('Post creation failed');
      }
    } catch (err) {
      console.error('Error submitting post:', err.message);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">📢 Create a New Post</h1>

      <div className="border-2 border-blue-500 rounded-lg p-6 bg-card shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="post-title" className="block font-semibold text-sm mb-1 text-blue-700">Title</label>
            <input
              id="post-title"
              name="title"
              type="text"
              className="input w-full"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground mt-1">
              URL preview: <span className="font-mono text-blue-600">/posts/{slug || 'your-title'}</span>
            </p>
          </div>

          <div>
            <label htmlFor="post-content" className="block font-semibold text-sm mb-1 text-blue-700">Content</label>
            <textarea
              id="post-content"
              name="content"
              className="textarea w-full min-h-[200px]"
              placeholder="Write your content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="post-excerpt" className="block font-semibold text-sm mb-1 text-blue-700">Excerpt</label>
            <textarea
              id="post-excerpt"
              name="excerpt"
              className="textarea w-full min-h-[80px]"
              placeholder="Optional short description"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="post-category" className="block font-semibold text-sm mb-1 text-blue-700">Category</label>
            <select
              id="post-category"
              name="category"
              className="select w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Choose a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="post-tags" className="block font-semibold text-sm mb-1 text-blue-700">Tags</label>
            <input
              id="post-tags"
              name="tags"
              type="text"
              className="input w-full"
              placeholder="Comma-separated tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="file-upload" className="block text-sm font-bold mb-2 text-blue-700">
              📸 Upload Image
            </label>
            <input
              id="file-upload"
              name="image"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full font-semibold"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-4 border border-blue-300 rounded-md p-2 bg-muted">
                <p className="text-sm font-bold text-blue-600 mb-1">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded max-h-64 object-cover mx-auto"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="isPublished" className="flex items-center gap-2 font-medium">
              <input
                id="isPublished"
                name="isPublished"
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              Publish immediately
            </label>
          </div>

          <button
            type="submit"
            disabled={!user?._id}
            className={`w-full py-3 px-6 rounded-lg font-bold transition ${
              user?._id
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            🚀 Create Post
          </button>

          {!user?._id && (
            <p className="text-sm text-red-500 mt-2">
              You must be logged in to create a post.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default CreatePost;