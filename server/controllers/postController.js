const Post = require('../models/Post');

// @desc    Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author category');
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single post by ID
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author category comments.user');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await post.incrementViewCount();
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

// @desc    Update post
exports.updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};