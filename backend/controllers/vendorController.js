const Vendor = require("../models/Vendor");

exports.createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found" });
    res.json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllVendors = async (_req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json({ success: true, data: vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Vendor not found" });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const removed = await Vendor.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: "Vendor not found" });
    res.json({ success: true, message: "Vendor deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};