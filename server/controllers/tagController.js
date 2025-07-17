const Tag = require('../models/Tag');

// 📚 Get all tags
exports.getAllTags = async (req, res) => {
  const tags = await Tag.find().sort({ createdAt: -1 });
  res.json(tags);
};

// ➕ Create new tag
exports.createTag = async (req, res) => {
  const { name } = req.body;
  const tag = new Tag({ name });
  await tag.save();
  res.status(201).json(tag);
};

// 📝 Update tag by ID
exports.updateTag = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedTag) return res.status(404).json({ error: 'Tag not found' });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete tag by ID
exports.deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);

    if (!deletedTag) return res.status(404).json({ error: 'Tag not found' });
    res.status(204).end(); // no content
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};