const express = require('express');
const router = express.Router();

const {
    createNode, getNodeById, updateNode, deleteNode, getAllNodes
} = require('../controllers/kgNodeController');
const {
    createEdge, getEdgeById, updateEdge, deleteEdge, getAllEdges
} = require('../controllers/kgEdgeController');
const { auth, isAdmin } = require('../middlewares/auth');

// KG Nodes
router.post('/node/create', auth, isAdmin, createNode);
router.get('/node/:id', auth, getNodeById);
router.put('/node/update/:id', auth, isAdmin, updateNode);
router.delete('/node/delete/:id', auth, isAdmin, deleteNode);
router.get('/nodes', auth, getAllNodes);

// KG Edges
router.post('/edge/create', auth, isAdmin, createEdge);
router.get('/edge/:id', auth, getEdgeById);
router.put('/edge/update/:id', auth, isAdmin, updateEdge);
router.delete('/edge/delete/:id', auth, isAdmin, deleteEdge);
router.get('/edges', auth, getAllEdges);

module.exports = router;