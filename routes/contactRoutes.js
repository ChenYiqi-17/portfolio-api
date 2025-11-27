const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

// Public route
router.post('/', createMessage);

// Protected routes (Admin)
router.get('/', protect, getMessages);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
