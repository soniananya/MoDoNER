const DPR = require("../models/DPR");
const supabase = require("../config/supabase");

// Helper to validate MIME types (similar to File controller pattern)
function getFileType(mimetype) {
  if (!mimetype) return null;
  if (mimetype.includes("pdf")) return "pdf";
  if (mimetype.includes("image")) return "image";
  if (mimetype.includes("officedocument") || mimetype.includes("msword") || mimetype.includes("wordprocessingml")) return "docx";
  return null;
}

exports.uploadDPR = async (req, res) => {
  try {
    const { projectId } = req.body;
    const userId = req.user.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    const isTeamMember = project.team.some(member => member.user.toString() === userId);
    if (!isTeamMember) {
      return res.status(403).json({ success: false, message: "You are not a member of this project" });
    }
    const member = project.team.find(member => member.user.toString() === userId);
    if (!['admin', 'reviewer', 'project_lead'].includes(member.role)) {
      return res.status(403).json({ success: false, message: "You do not have permission to upload DPRs for this project" });
    }

    if (!req.files || !req.files.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const file = req.files.file;
    const originalname = file.name;
    const buffer = file.data;
    const mimetype = file.mimetype;
    const fileName = req.body.filename || originalname;

    const fileType = getFileType(mimetype);
    if (!fileType) {
      return res.status(400).json({ success: false, message: "Unsupported file type" });
    }

    const { language, version } = req.body;
    if (!projectId) {
      return res.status(400).json({ success: false, message: "Project ID required" });
    }

    const filePath = `dpr-projects/${projectId}/${Date.now()}_${fileName}`;

    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME)
      .upload(filePath, buffer, { contentType: mimetype, upsert: false });

    if (error) {
      throw new Error(`Supabase upload error: ${error.message}`);
    }

    const { data: publicURL, error: urlError } = supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME)
      .getPublicUrl(filePath);

    if (urlError) {
      throw new Error(`Supabase public URL error: ${urlError.message}`);
    }

    // Create DPR metadata record with reference to this file
    const newDPR = await DPR.create({
      projectId,
      uploader: req.user.id,
      version: version || 1,
      language: language || "en",
      fileUrl: publicURL.publicUrl,
      fileType,
      // Other DPR fields left empty for later extraction
      rawText: "",
      extractedSections: {},
      budgetTotal: 0,
      budgetLineItems: [],
      milestones: [],
      vendors: [],
      locations: [],
      riskScores: {},
      flags: [],
      citations: []
    });

    res.status(201).json({ success: true, data: newDPR, message: "DPR uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDPRById = async (req, res) => {
  try {
    const dpr = await DPR.findById(req.params.id);
    if (!dpr) return res.status(404).json({ success: false, message: "DPR not found" });
    res.json({ success: true, data: dpr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDPRVersions = async (req, res) => {
  try {
    const { projectId } = req.params;
    const versions = await DPR.find({ projectId }).sort({ version: -1 });
    res.json({ success: true, data: versions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllDPRs = async (_req, res) => {
  try {
    const dprs = await DPR.find();
    res.json({ success: true, data: dprs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateDPR = async (req, res) => {
  try {
    const updated = await DPR.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "DPR not found" });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteDPR = async (req, res) => {
  try {
    const removed = await DPR.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: "DPR not found" });
    res.json({ success: true, message: "DPR deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placeholder: Use your extraction pipeline
exports.extractDataFromDPR = async (req, res) => {
  res.status(501).json({ success: false, message: "Extract DPR data - implement logic" });
};

// Placeholder: Rule-based validation
exports.validateDPR = async (req, res) => {
  res.status(501).json({ success: false, message: "Validate DPR - implement logic" });
};

// Placeholder: Return risk scores for a DPR
exports.getDPRRiskScores = async (req, res) => {
  try {
    const dpr = await DPR.findById(req.params.id, "riskScores");
    if (!dpr) return res.status(404).json({ success: false, message: "DPR not found" });
    res.json({ success: true, data: dpr.riskScores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placeholder: Get citations
exports.getDPRCitations = async (req, res) => {
  try {
    const dpr = await DPR.findById(req.params.id, "citations");
    if (!dpr) return res.status(404).json({ success: false, message: "DPR not found" });
    res.json({ success: true, data: dpr.citations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.downloadDPRFile = async (req, res) => {
  // Implementation depends on your file storage logic
  // Example: Retrieve DPR and send file URL
  try {
    const dpr = await DPR.findById(req.params.id);
    if (!dpr || !dpr.fileUrl) {
      return res.status(404).json({ success: false, message: "File not found" });
    }
    return res.json({ success: true, fileUrl: dpr.fileUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};