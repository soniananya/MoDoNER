const express = require('express');
const router = express.Router();

const {
    uploadDPR, getDPRById, getDPRVersions, getAllDPRs, updateDPR, deleteDPR,
    extractDataFromDPR, validateDPR, getDPRRiskScores, getDPRCitations, downloadDPRFile
} = require('../controllers/dprController');

const { auth, isReviewer, isAdmin, isProjectLead } = require('../middlewares/auth');

router.post('/upload', auth, uploadDPR);
router.get('/download/:id', auth, downloadDPRFile);
router.get('/:id', auth, getDPRById);
router.get('/versions/:projectId', auth, getDPRVersions);
router.get('/list', auth, getAllDPRs);
router.put('/update/:id', auth, isAdmin, updateDPR);
router.delete('/delete/:id', auth, isAdmin, deleteDPR);
router.post('/extract/:id', auth, extractDataFromDPR);
router.post('/validate/:id', auth, validateDPR);
router.get('/risk-scores/:id', auth, getDPRRiskScores);
router.get('/citations/:id', auth, getDPRCitations);

module.exports = router;