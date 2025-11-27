const Message = require('../models/Message');

// @desc    Create a contact message
// @route   POST /api/contact
// @access  Public
const createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
// @route   GET /api/contact
// @access  Private (Admin)
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read
// @route   PUT /api/contact/:id/read
// @access  Private (Admin)
const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage
};
