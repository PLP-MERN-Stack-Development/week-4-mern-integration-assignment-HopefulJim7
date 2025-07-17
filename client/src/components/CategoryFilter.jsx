import { useEffect, useState } from 'react';
import { categoryService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';

const CategoryFilter = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
        setFiltered(data);
      } catch (err) {
        console.error('Failed to load categories:', err.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!debouncedSearch) {
      setFiltered(categories);
    } else {
      const term = debouncedSearch.toLowerCase();
      setFiltered(categories.filter((c) => c.name.toLowerCase().includes(term)));
    }
  }, [debouncedSearch, categories]);

  const handleSelect = (category) => {
    setActive(category.slug);
    onSelect?.(category.slug);
  };

  return (
    <div className="space-y-2 py-4">
      <Input
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <div className="flex flex-wrap gap-2 pt-2">
        {filtered.map((cat) => (
          <Button
            key={cat.slug}
            variant={active === cat.slug ? 'default' : 'outline'}
            onClick={() => handleSelect(cat)}
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;