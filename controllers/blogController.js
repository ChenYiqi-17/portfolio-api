const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find({ published: true })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog post with comments
// @route   GET /api/blog/:id
// @access  Public
const getBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username');

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Get comments for this post
    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        ...post.toObject(),
        comments
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, coverImage, tags, published } = req.body;

    const post = await BlogPost.create({
      title,
      content,
      excerpt,
      coverImage,
      tags,
      published: published !== undefined ? published : true,
      author: req.user._id
    });

    const populatedPost = await BlogPost.findById(post._id)
      .populate('author', 'username');

    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private (Author only)
const updateBlogPost = async (req, res, next) => {
  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    const { title, content, excerpt, coverImage, tags, published } = req.body;

    post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, excerpt, coverImage, tags, published },
      { new: true, runValidators: true }
    ).populate('author', 'username');

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private (Author only)
const deleteBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    // Delete all comments for this post
    await Comment.deleteMany({ post: req.params.id });

    await BlogPost.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get comments for a blog post
// @route   GET /api/blog/:postId/comments
// @access  Public
const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a comment
// @route   POST /api/blog/:postId/comments
// @access  Private
const createComment = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const { body } = req.body;

    const comment = await Comment.create({
      body,
      author: req.user._id,
      post: req.params.postId
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username');

    res.status(201).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getComments,
  createComment
};
