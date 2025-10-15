const KGEdge = require("../models/KGEdge");

exports.createEdge = async (req, res) => {
  try {
    const edge = await KGEdge.create(req.body);
    res.status(201).json({ success: true, data: edge });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEdgeById = async (req, res) => {
  try {
    const edge = await KGEdge.findById(req.params.id);
    if (!edge) return res.status(404).json({ success: false, message: "Edge not found" });
    res.json({ success: true, data: edge });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEdge = async (req, res) => {
  try {
    const updated = await KGEdge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Edge not found" });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEdge = async (req, res) => {
  try {
    const removed = await KGEdge.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: "Edge not found" });
    res.json({ success: true, message: "Edge deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllEdges = async (_req, res) => {
  try {
    const edges = await KGEdge.find();
    res.json({ success: true, data: edges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};