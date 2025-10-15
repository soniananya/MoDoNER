const Risk = require("../models/Risk");

exports.getRiskById = async (req, res) => {
  try {
    const risk = await Risk.findById(req.params.id);
    if (!risk) return res.status(404).json({ success: false, message: "Risk not found" });
    res.json({ success: true, data: risk });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRisksByDPR = async (req, res) => {
  try {
    const risks = await Risk.find({ dpr: req.params.dprId });
    res.json({ success: true, data: risks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createRiskAlert = async (req, res) => {
  try {
    const risk = await Risk.create(req.body);
    res.status(201).json({ success: true, data: risk });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateRisk = async (req, res) => {
  try {
    const updated = await Risk.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Risk not found" });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteRisk = async (req, res) => {
  try {
    const removed = await Risk.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: "Risk not found" });
    res.json({ success: true, message: "Risk deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllRisks = async (_req, res) => {
  try {
    const risks = await Risk.find();
    res.json({ success: true, data: risks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
