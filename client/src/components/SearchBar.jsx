import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const debounced = useDebounce(input, 400);

  useEffect(() => {
    onSearch?.(debounced);
  }, [debounced, onSearch]);

  return (
    <Input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search posts, tags, or categories..."
      className="max-w-md"
    />
  );
};

export default SearchBar;