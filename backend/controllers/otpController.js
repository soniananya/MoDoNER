const OTP = require("../models/OTP");
const otpgenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mailTemplates/emailVerification");

const sendOtpEmail = async (email, otp) => {
    await mailSender(email, "Verification OTP", emailTemplate(otp));
};

exports.generateOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: "Email required" });

        let otp;
        let exists;
        do {
            otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            exists = await OTP.findOne({ otp });
        } while (exists);

        await OTP.create({ email, otp });
        await sendOtpEmail(email, otp);

        res.status(201).json({ success: true, message: "OTP generated and sent", otp });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const record = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if (!record) return res.status(400).json({ success: false, message: "OTP expired or not found" });
        if (record.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });

        res.json({ success: true, message: "OTP verified" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.resendOTP = async (req, res) => {
    return this.generateOTP(req, res);
};

exports.deleteOTP = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await OTP.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: "OTP not found" });
        res.json({ success: true, message: "OTP deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
