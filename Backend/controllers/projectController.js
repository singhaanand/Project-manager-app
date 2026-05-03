const Project = require("../models/Project");

// Create Project (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project name required" });
    }

    const project = await Project.create({
      name,
      createdBy: req.user.id,
      members: []
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔥 NEW: Get all projects (frontend use)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add Member to Project
exports.addMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    project.members.push(req.body.userId);
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};