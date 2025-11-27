const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog post content is required']
  },
  excerpt: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Auto-generate excerpt if not provided
blogPostSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150) + '...';
  }
  next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
