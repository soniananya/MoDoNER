// models/Project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  team: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'reviewer', 'employee', 'ai_agent', 'project_lead'],
      required: true
    }
  }],
  dprs: [{
    type: Schema.Types.ObjectId,
    ref: 'DPR'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);