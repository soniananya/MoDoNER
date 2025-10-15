const mongoose = require('mongoose');

const kgNodeSchema = new mongoose.Schema({
    nodeType: { 
        type: String, 
        enum: ["DPR", "Vendor", "Resource", "Location", "FundingSource", "Milestone"], 
        required: true 
    },
    referenceId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    metadata: { 
        type: mongoose.Schema.Types.Mixed 
    }
});

module.exports = mongoose.model("KGNode", kgNodeSchema);