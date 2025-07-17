import { useState, useEffect } from 'react';

const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      setLoading(true);
      setError('');

      try {
        const result = await fetchFn();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message || 'Fetch error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
};

export default useFetch;