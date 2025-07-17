import { useEffect, useState } from 'react';
import { tagService } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/context/ToastContext';

const TagEditor = () => {
  const { showToast } = useToast();
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');

  const fetchTags = async () => {
    const data = await tagService.getAllTags();
    setTags(data);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const createTag = async () => {
    try {
      await tagService.createTag({ name });
      showToast({ message: 'Tag created.', type: 'success' });
      setName('');
      fetchTags();
    } catch {
      showToast({ message: 'Error creating tag.', type: 'error' });
    }
  };

  return (
    <div className="space-y-4 max-w-lg">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New tag name" />
      <Button onClick={createTag}>Create Tag</Button>

      <ul className="space-y-1 pt-4 text-sm text-muted-foreground">
        {tags.map((tag) => (
          <li key={tag.slug}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagEditor;