const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken');
const authorize = require('../middleware/authorize');
const catchAsync = require('../utils/catchAsync');
const upload = require('../utils/upload'); // 🆕 Multer config

// 📰 Public routes
router.get('/', catchAsync(postController.getAllPosts));
router.get('/:id', catchAsync(postController.getPostById));

// ✍️ Protected routes (normal users + elevated roles)
router.post(
  '/',
  verifyToken,
  upload.single('image'), // 🖼️ Image handling middleware
  catchAsync(postController.createPost)
);

// ✏️ Update + delete routes (admin/editor only)
router.put(
  '/:id',
  verifyToken,
  authorize(['admin', 'editor']),
  catchAsync(postController.updatePost)
);

router.delete(
  '/:id',
  verifyToken,
  authorize('admin'),
  catchAsync(postController.deletePost)
);

module.exports = router;