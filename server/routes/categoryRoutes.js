const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryBySlug,
  createCategory
} = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

// Admin only
router.post('/', protect, adminOnly, createCategory);

module.exports = router;