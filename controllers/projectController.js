const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('user', 'username');

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
  try {
    const { title, description, imageUrl, repoUrl, liveUrl, technologies } = req.body;

    const project = await Project.create({
      title,
      description,
      imageUrl,
      repoUrl,
      liveUrl,
      technologies,
      user: req.user._id
    });

    const populatedProject = await Project.findById(project._id)
      .populate('user', 'username');

    res.status(201).json({
      success: true,
      data: populatedProject
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check ownership
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this project' });
    }

    const { title, description, imageUrl, repoUrl, liveUrl, technologies } = req.body;

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, repoUrl, liveUrl, technologies },
      { new: true, runValidators: true }
    ).populate('user', 'username');

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check ownership
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
