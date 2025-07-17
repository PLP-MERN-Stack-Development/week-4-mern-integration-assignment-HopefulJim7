// utils/upload.js
const multer = require('multer');
const path = require('path');

// store files locally (you can integrate Cloudinary later)
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  },
});

const upload = multer({ storage });

module.exports = upload;