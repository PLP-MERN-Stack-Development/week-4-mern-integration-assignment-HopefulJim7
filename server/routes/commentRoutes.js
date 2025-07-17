const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// POST /api/comments — add comment to a post
router.post('/', async (req, res) => {
  try {
    const { postId, author, text } = req.body;
    const comment = new Comment({ post: postId, author, text });
    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// GET /api/comments/:postId — get all comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load comments' });
  }
});

module.exports = router;