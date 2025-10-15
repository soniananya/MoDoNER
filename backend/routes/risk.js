const express = require('express');
const router = express.Router();

const {
    getRiskById, getRisksByDPR, createRiskAlert,
    updateRisk, deleteRisk, getAllRisks
} = require('../controllers/riskController');
const { auth, isAdmin, isReviewer } = require('../middlewares/auth');

router.get('/:id', auth, getRiskById);
router.get('/by-dpr/:dprId', auth, getRisksByDPR);
router.post('/create', auth, isReviewer, createRiskAlert);
router.put('/update/:id', auth, isAdmin, updateRisk);
router.delete('/delete/:id', auth, isAdmin, deleteRisk);
router.get('/list', auth, getAllRisks);

module.exports = router;