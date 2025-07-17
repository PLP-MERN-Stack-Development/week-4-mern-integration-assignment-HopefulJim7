const categoryService = {
  getAll: async () => {
    const res = await fetch('/api/categories', {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  },

  create: async (payload) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 🔐 Sends auth cookies
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create category');
    return await res.json();
  },

  update: async (id, payload) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update category');
    return await res.json();
  },

  delete: async (id) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete category');
    return await res.json();
  },
};

export default categoryService;