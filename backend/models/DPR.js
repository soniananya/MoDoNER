const mongoose = require('mongoose');

const dprSchema = new mongoose.Schema({
    projectId: { 
        type: String, 
        required: true, 
        index: true 
    },
    uploader: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    uploadTimestamp: { 
        type: Date, 
        default: Date.now 
    },
    version: { 
        type: Number, 
        default: 1 
    },
    language: { 
        type: String, 
        default: "en" 
    },
    rawText: { 
        type: String 
    },
    extractedSections: {
        budget: { 
            type: mongoose.Schema.Types.Mixed 
        },
        timeline: { 
            type: mongoose.Schema.Types.Mixed 
        },
        resources: { 
            type: mongoose.Schema.Types.Mixed 
        },
        feasibility: { 
            type: mongoose.Schema.Types.Mixed 
        }
    },
    budgetTotal: { 
        type: Number 
    },
    budgetLineItems: [{
        item: { 
            type: String 
        },
        amount: { 
            type: Number 
        }
    }],
    milestones: [{
        name: { 
            type: String 
        },
        startDate: { 
            type: Date 
        },
        endDate: { 
            type: Date 
        }
    }],
    vendors: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Vendor" 
    }],
    locations: [{ 
        type: String 
    }],
    riskScores: {
        overall: { 
            type: Number 
        },
        costOverrun: { 
            type: Number 
        },
        scheduleSlip: { 
            type: Number 
        },
        resourceShortage: { 
            type: Number 
        }
    },
    flags: [{ 
        type: String 
    }],
    citations: [{
        section: { 
            type: String 
        },
        page: { 
            type: Number 
        },
        offset: { 
            type: Number 
        },
        textSnippet: { 
            type: String 
        }
    }]
});

module.exports = mongoose.model("DPR", dprSchema);