const express = require('express');
const router = express.Router();

const {
  createProject,
  getProjectById,
  listProjects,
  addTeamMember,
  removeTeamMember,
  assignProjectToUser,
  deleteProject
} = require("../controllers/projectController");

const { auth, isAdmin } = require('../middlewares/auth'); // Use your actual middleware as needed

// Create a project (admin or global admin)
router.post('/create', auth, isAdmin, createProject);

// Get project details
router.get('/:id', auth, getProjectById);

// List all projects
router.get('/list', auth, listProjects);

// Add a team member
router.post('/:id/add-member', auth, isAdmin, addTeamMember);

// Remove a team member
router.post('/:id/remove-member', auth, isAdmin, removeTeamMember);

// Assign project to user (helper for syncing both sides)
router.post('/assign-user', auth, isAdmin, assignProjectToUser);

// Delete a project
router.delete('/delete/:id', auth, isAdmin, deleteProject);

module.exports = router;