const Category = require('../models/Category');

// @desc    Get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    next(err);
  }
};

// @desc    Create a category (triggers slug generation via schema hook)
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // 🛡️ Input validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // 🧱 Create new category instance
    const category = new Category({
      name: name.trim(),
      description,
    });

    // 🧠 Save triggers pre('save') hook to generate slug
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating category:', err);
    next(err);
    console.log('Running slug hook with name:', this.name);
  }
};