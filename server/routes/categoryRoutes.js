const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');
const authorize = require('../middleware/authorize');
const catchAsync = require('../utils/catchAsync');

// 🔍 Public
router.get('/', catchAsync(categoryController.getAllCategories));

// 🔐 Admin only
router.post('/', verifyToken, authorize('admin'), catchAsync(categoryController.createCategory));
router.put('/:id', verifyToken, authorize('admin'), catchAsync(categoryController.updateCategory));
router.delete('/:id', verifyToken, authorize('admin'), catchAsync(categoryController.deleteCategory));

module.exports = router;