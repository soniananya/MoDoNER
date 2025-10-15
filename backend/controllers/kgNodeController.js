const KGNode = require("../models/KGNode");

exports.createNode = async (req, res) => {
  try {
    const node = await KGNode.create(req.body);
    res.status(201).json({ success: true, data: node });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getNodeById = async (req, res) => {
  try {
    const node = await KGNode.findById(req.params.id);
    if (!node) return res.status(404).json({ success: false, message: "Node not found" });
    res.json({ success: true, data: node });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateNode = async (req, res) => {
  try {
    const updated = await KGNode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Node not found" });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteNode = async (req, res) => {
  try {
    const removed = await KGNode.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: "Node not found" });
    res.json({ success: true, message: "Node deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllNodes = async (_req, res) => {
  try {
    const nodes = await KGNode.find();
    res.json({ success: true, data: nodes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};