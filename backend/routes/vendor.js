const express = require('express');
const router = express.Router();

const { createVendor, getVendorById, getAllVendors, updateVendor, deleteVendor } = require('../controllers/vendorController');
const { auth, isAdmin } = require('../middlewares/auth');

router.post('/create', auth, isAdmin, createVendor);
router.get('/:id', auth, getVendorById);
router.get('/list', auth, getAllVendors);
router.put('/update/:id', auth, isAdmin, updateVendor);
router.delete('/delete/:id', auth, isAdmin, deleteVendor);

module.exports = router;