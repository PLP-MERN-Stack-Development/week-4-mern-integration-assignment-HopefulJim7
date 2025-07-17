import { useEffect, useState } from 'react';
import { tagService } from '@/services/api';
import { Badge } from '@/components/ui/badge';

const TagCloud = ({ onSelect, activeTag }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await tagService.getAllTags();
        setTags(data);
      } catch (err) {
        console.error('Failed to load tags:', err.message);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 py-4">
      {tags.map((tag) => (
        <Badge
          key={tag.slug}
          variant={activeTag === tag.slug ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => onSelect?.(tag.slug)}
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};

export default TagCloud;