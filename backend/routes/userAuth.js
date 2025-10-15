const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/authController');
const { 
    createUser, getUserById, getAllUsers, updateUser, deleteUser, assignRoles 
} = require('../controllers/userController');
const { auth, isAdmin } = require('../middlewares/auth');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);

// User profile, management
router.get('/me', auth, getUserById);
router.put('/update/:id', auth, updateUser);
router.delete('/delete/:id', auth, deleteUser);
router.get('/users', auth, isAdmin, getAllUsers);
router.post('/assign-roles/:id', auth, isAdmin, assignRoles);

// Support createUser if needed for admin
router.post('/create', auth, isAdmin, createUser);

module.exports = router;