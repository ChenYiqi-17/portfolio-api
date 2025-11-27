const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getComments,
  createComment
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);
router.get('/:postId/comments', getComments);

// Protected routes
router.post('/', protect, createBlogPost);
router.put('/:id', protect, updateBlogPost);
router.delete('/:id', protect, deleteBlogPost);
router.post('/:postId/comments', protect, createComment);

module.exports = router;
