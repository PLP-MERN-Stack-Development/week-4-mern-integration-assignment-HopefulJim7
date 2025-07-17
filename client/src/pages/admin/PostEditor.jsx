import { useState, useEffect } from 'react';
import { postService, categoryService, tagService } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/context/ToastContext';

const PostEditor = () => {
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchMeta = async () => {
      setAllCategories(await categoryService.getAllCategories());
      setAllTags(await tagService.getAllTags());
    };
    fetchMeta();
  }, []);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      return showToast({ message: 'Title and content required.', type: 'error' });
    }

    try {
      await postService.createPost({
        title,
        content,
        category,
        tags,
      });
      showToast({ message: '✅ Post created.', type: 'success' });
      setTitle('');
      setContent('');
      setCategory('');
      setTags([]);
    } catch (err) {
      const msg = err.response?.data?.error || '❌ Error creating post';
      showToast({ message: msg, type: 'error' });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-primary">Create New Post</h2>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content"
        rows={6}
      />

      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        {allCategories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>{cat.name}</option>
        ))}
      </Select>

      <Select
        multiple
        value={tags}
        onChange={(e) => setTags([...e.target.selectedOptions].map(opt => opt.value))}
      >
        {allTags.map((tag) => (
          <option key={tag._id} value={tag.name}>{tag.name}</option>
        ))}
      </Select>

      <Button onClick={handleCreate}>Publish Post</Button>
    </div>
  );
};

export default PostEditor;