import { useMemo } from 'react';

const usePagination = (data = [], currentPage = 1, perPage = 10) => {
  const totalPages = Math.ceil(data.length / perPage);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return data.slice(start, start + perPage);
  }, [data, currentPage, perPage]);

  return { pageData, totalPages };
};

export default usePagination;