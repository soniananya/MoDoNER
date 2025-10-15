const router = require("express").Router();

const userAuthRoutes = require("./userAuth");
const dprRoutes = require("./dpr");
const projectRoutes = require("./project");
const vendorRoutes = require("./vendor");
const riskRoutes = require("./risk");
const knowledgeGraphRoutes = require("./knowledgeGraph");
const otpRoutes = require("./otp");

router.use("/user", userAuthRoutes);
router.use("/dpr", dprRoutes);
router.use("/project", projectRoutes);
router.use("/vendor", vendorRoutes);
router.use("/risk", riskRoutes);
router.use("/kg", knowledgeGraphRoutes);
router.use("/otp", otpRoutes);

module.exports = router; 