const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const verifyToken = require('../middleware/verifyToken');
const authorize = require('../middleware/authorize');
const catchAsync = require('../utils/catchAsync');

// 🔍 Public
router.get('/', catchAsync(tagController.getAllTags));

// 🔐 Protected (admin only)
router.post('/', verifyToken, authorize('admin'), catchAsync(tagController.createTag));
router.put('/:id', verifyToken, authorize('admin'), catchAsync(tagController.updateTag));
router.delete('/:id', verifyToken, authorize('admin'), catchAsync(tagController.deleteTag));

module.exports = router;