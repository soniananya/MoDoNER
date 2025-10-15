const Project = require("../models/Project");
const User = require("../models/User");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { name, description, adminIds, team } = req.body;
    if (!name || !adminIds || !Array.isArray(adminIds) || adminIds.length === 0) {
      return res.status(400).json({ success: false, message: "Project name and at least one admin required" });
    }
    const project = await Project.create({
      name,
      description,
      admins: adminIds,
      team: team || []
    });
    res.status(201).json({ success: true, data: project, message: "Project created" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get full project details by ID (including team and DPRs)
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("admins", "username email name")
      .populate("team.user", "username email name")
      .populate("dprs");
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// List all projects
exports.listProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate("admins", "username name").populate("team.user", "username name");
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add a team member to a project
exports.addTeamMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    project.team.push({ user: userId, role });
    await project.save();
    res.json({ success: true, data: project, message: "Team member added" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Remove team member from a project
exports.removeTeamMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    project.team = project.team.filter(member => member.user.toString() !== userId);
    await project.save();
    res.json({ success: true, data: project, message: "Team member removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Assign project to user (helper: updates both User+Project)
exports.assignProjectToUser = async (req, res) => {
  try {
    const { userId, projectId, role } = req.body;
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);
    if (!user || !project) return res.status(404).json({ success: false, message: "User or project not found" });
    // Only push if not already assigned
    if (!user.projects.some(prj => prj.project.toString() === projectId)) {
      user.projects.push({ project: project._id, role });
      await user.save();
    }
    if (!project.team.some(member => member.user.toString() === userId)) {
      project.team.push({ user: user._id, role });
      await project.save();
    }
    res.json({ success: true, user, project, message: "User assigned to project" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};