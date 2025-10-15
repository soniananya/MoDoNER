const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    roles: [{ 
        type: String, 
        enum: ["admin", "project_lead", "reviewer", "auditor"] 
    }],
    projects: [{
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        role:    { 
        type: String,
        enum: ['admin', 'reviewer', 'employee', 'ai_agent', 'project_lead'],
        required: true
        }
        // Can add assignmentDate, custom permissions, etc.
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("User", userSchema);