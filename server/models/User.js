const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'editor', 'admin'],
      default: 'user',
    },
    profileImage: {
      type: String,
      default: 'default-avatar.jpg',
    },
  },
  { timestamps: true }
);

// Optional virtual for profile URL
UserSchema.virtual('profileUrl').get(function () {
  return `/users/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);