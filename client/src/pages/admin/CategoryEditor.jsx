import { useEffect, useState } from 'react';
import { categoryService } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/context/ToastContext';

const CategoryEditor = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch {
      showToast({ message: 'Failed to load categories.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      showToast({ message: 'Category name is required.', type: 'error' });
      return;
    }

    try {
      await categoryService.createCategory({ name: trimmedName, description });
      showToast({ message: '✅ Category created.', type: 'success' });
      setName('');
      setDescription('');
      fetchCategories();
    } catch (err) {
      const message =
        err.response?.data?.error || '❌ Error creating category.';
      showToast({ message, type: 'error' });
    }
  };

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-xl font-bold text-primary">Create Category</h2>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        required
      />

      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Optional description"
      />

      <Button
        onClick={createCategory}
        disabled={!name.trim()}
        className="w-fit"
      >
        Add Category
      </Button>

      <ul className="pt-6 space-y-1 text-sm text-muted-foreground">
        {categories.map((cat) => (
          <li key={cat.slug}>
            {cat.name} {cat.description ? `– ${cat.description}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryEditor;