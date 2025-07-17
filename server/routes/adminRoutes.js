const express = require('express');
const router = express.Router();
const { getDashboardStats, listUsers } = require('../controllers/adminController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

router.get('/dashboard', verifyToken, requireAdmin, getDashboardStats);
router.get('/users', verifyToken, requireAdmin, listUsers);

module.exports = router;