import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';

import { postService, tagService } from '@/services/api';
import PostCard from '@/components/PostCard';
import Loader from '@/components/Loader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 📝 Post creation state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // 🧠 Fetch user posts
  const fetchUserPosts = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const data = await postService.getUserPosts(user._id);
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err.message);
      setError('Failed to load your posts.');
    } finally {
      setLoading(false);
    }
  };

  // 🏷️ Fetch available tags
  const fetchTags = async () => {
    try {
      const data = await tagService.getAllTags();
      setAvailableTags(data || []);
    } catch {
      showToast({ message: 'Failed to load tags', type: 'error' });
    }
  };

  useEffect(() => {
    fetchUserPosts();
    fetchTags();
  }, []);

  // 📷 Image handling
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 🚀 Publish post
  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      return showToast({ message: 'Title and content required.', type: 'error' });
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('content', content.trim());
    formData.append('author', user._id);
    formData.append('tags', JSON.stringify(tags));
    if (image) formData.append('image', image);

    try {
      await postService.createPost(formData);
      showToast({ message: '✅ Post published.', type: 'success' });

      // Reset form
      setTitle('');
      setContent('');
      setTags([]);
      setImage(null);
      setImagePreview('');

      fetchUserPosts(); // Refresh post list
    } catch (err) {
      const msg = err.response?.data?.error || '❌ Failed to create post';
      showToast({ message: msg, type: 'error' });
    }
  };

  return (
    <main className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <section className="max-w-3xl mx-auto space-y-6">
        {/* 👋 Greeting + Theme toggle */}
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome, {user?.username || 'Guest'} 👋</h1>
          <Button onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </header>

        {/* 📝 Post Composer */}
        <div className="bg-muted p-4 rounded space-y-4">
          <h2 className="text-xl font-semibold">Create New Post</h2>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
          />

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content..."
            rows={6}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-full h-auto rounded mt-2" />
          )}

          <select
            multiple
            value={tags}
            onChange={(e) =>
              setTags([...e.target.selectedOptions].map(opt => opt.value))
            }
            className="w-full border px-3 py-2 rounded"
          >
            {availableTags.map((tag) => (
              <option key={tag._id} value={tag.name}>{tag.name}</option>
            ))}
          </select>

          <Button onClick={handleCreatePost}>Publish</Button>
        </div>

        {/* 📂 User’s Posts */}
        {loading && <Loader />}
        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded">{error}</div>
        )}

        {!loading && posts.length > 0 ? (
          <section className="grid gap-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </section>
        ) : !loading && (
          <p className="text-center text-gray-500">
            You haven’t posted anything yet.
          </p>
        )}
      </section>
    </main>
  );
};

export default Profile;