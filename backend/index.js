const path = require("path");
const express = require("express");
const app = express();

require("dotenv").config();

const { dbConnect } = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Database connection
dbConnect();

// Middleware
app.use(express.json());
app.use(cookieparser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000", // update as per frontend origin
    credentials: true,
  })
);

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, "public")));

// API routes
const routes = require("./routes/mainRoute");
app.use("/api/v1", routes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("App is running at PORT", PORT);
});