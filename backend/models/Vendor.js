const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    contactInfo: { 
        type: String 
    },
    rating: { 
        type: Number 
    }
});

module.exports = mongoose.model("Vendor", vendorSchema);