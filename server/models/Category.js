const mongoose = require('mongoose');

// ✨ Centralized slug generator (can be moved to utils if reused)
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // Remove non-word characters
    .replace(/\s+/g, '-')       // Replace spaces with dashes
    .replace(/-+/g, '-');       // Collapse multiple dashes
}

// 🧩 Category schema definition
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
      maxlength: [50, 'Category name too long'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [200, 'Description too long'],
    },
  },
  { timestamps: true }
);

// 🧠 Auto-generate slug before validation
CategorySchema.pre('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = generateSlug(this.name);
  }
  next();
});

// 🛡️ Reuse model safely to avoid overwrite in dev hot reload
module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);