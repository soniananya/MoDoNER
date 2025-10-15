const mongoose = require('mongoose');

const kgEdgeSchema = new mongoose.Schema({
    fromNode: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "KGNode", 
        required: true 
    },
    toNode: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "KGNode", 
        required: true 
    },
    edgeType: { 
        type: String, 
        enum: ["uses_vendor", "shares_resource", "same_funding", "near_location", "depends_on"], 
        required: true 
    },
    metadata: { 
        type: mongoose.Schema.Types.Mixed 
    }
});

module.exports = mongoose.model("KGEdge", kgEdgeSchema);