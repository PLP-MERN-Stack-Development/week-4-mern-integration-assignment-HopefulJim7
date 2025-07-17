// adminService.js

export const adminService = {
  getDashboardStats: async () => {
    const response = await fetch('/api/admin/dashboard', {
      credentials: 'include', // to send cookies
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return response.json(); // Returns { stats: { posts, categories, users, ... } }
  },

  listUsers: async () => {
    const response = await fetch('/api/admin/users', {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json(); // Returns { users: [...] }
  },
};