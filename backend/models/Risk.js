const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
    dpr: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "DPR", 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["costOverrun", "scheduleSlip", "resourceShortage"], 
        required: true 
    },
    score: { 
        type: Number 
    },
    reason: { 
        type: String 
    },
    alertSent: { 
        type: Boolean, 
        default: false 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Risk", riskSchema);