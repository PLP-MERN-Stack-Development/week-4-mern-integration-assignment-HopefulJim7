import api from './api';

const tagService = {
  getAllTags: async () => {
    const res = await api.get('/tags');
    return res.data;
  },

  createTag: async (tagData) => {
    const res = await api.post('/tags', tagData);
    return res.data;
  },

  deleteTag: async (tagId) => {
    const res = await api.delete(`/tags/${tagId}`);
    return res.data;
  },
};

export default tagService;