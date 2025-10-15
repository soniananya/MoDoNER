const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mailTemplates/emailVerification');

const otpSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    otp: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        index: { 
            expires: 30000 
        } 
    } // expires after 5 min
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from KMRL", emailTemplate(otp));
        console.log("Email sent Successfully", mailResponse.messageId);
        return mailResponse;
    } catch (error) {
        console.log("Error occurred while sending mails", error);
        throw error;
    }
}

otpSchema.pre("save", async function(next) {
    if (this.isNew) {
        try {
            await sendVerificationEmail(this.email, this.otp);
            next();
        } catch (error) {
            next(error); // Pass error to next middleware
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("OTP", otpSchema);