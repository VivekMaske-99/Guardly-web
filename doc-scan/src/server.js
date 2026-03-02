/**
 * Express Server Configuration
 * Main API endpoints for document scanning
 */

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const DocumentScannerService = require("./modules/documentScannerService");
const { modifyPdf } = require("./modules/pdfModifier");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Serve Frontend
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Multer configuration for file uploads
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not supported: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
});

/**
 * Health Check Endpoint
 */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "GuardLY Document Scanner",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

/**
 * Scan document from file upload
 * POST /api/scan/upload
 * Body: { userId: string }
 * File: document file (PDF, DOCX, TXT)
 */
app.post("/api/scan/upload", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get user profile from session/token (mock implementation)
    const userProfile = req.body.userProfile
      ? JSON.parse(req.body.userProfile)
      : getMockUserProfile(req.body.userId);

    if (!userProfile) {
      return res
        .status(401)
        .json({ error: "User not authenticated or profile not found" });
    }

    // Scan the file
    const scanResult = await DocumentScannerService.scanFile(
      req.file.path,
      userProfile,
    );

    // Delete the uploaded file after scanning (security measure)
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    res.json({
      success: true,
      data: scanResult,
    });
  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({
      error: error.message || "Error scanning document",
    });
  }
});

/**
 * Scan document from URL
 * POST /api/scan/url
 * Body: { url: string, userProfile: Object }
 */
app.post("/api/scan/url", async (req, res) => {
  try {
    const { url, userProfile } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    if (!userProfile) {
      return res.status(401).json({ error: "User profile is required" });
    }

    // Scan the URL
    const scanResult = await DocumentScannerService.scanURL(url, userProfile);

    res.json({
      success: true,
      data: scanResult,
    });
  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({
      error: error.message || "Error scanning URL",
    });
  }
});

/**
 * Get scan history/previous scans
 * GET /api/scans/:userId
 */
app.get("/api/scans/:userId", (req, res) => {
  try {
    const { userId } = req.params;

    // TODO: Implement database query to fetch scan history
    // For now, return mock data
    res.json({
      success: true,
      userId,
      scans: [],
      message: "Scan history feature coming soon",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Modify PDF (redact/mask/unmask/highlight) and return as download
 * POST /api/pdf/modify
 * Body JSON: { pdfBase64: string, detections: [{page, x, y, width, height}], action: 'redact'|'mask'|'unmask'|'highlight' }
 */
app.post("/api/pdf/modify", async (req, res) => {
  try {
    const { pdfBase64, detections = [], action = "redact" } = req.body;

    if (!pdfBase64) {
      return res
        .status(400)
        .json({ error: "pdfBase64 (base64 string) is required" });
    }

    // If unmask requested, return original PDF as download
    if (action === "unmask") {
      const orig = Buffer.from(pdfBase64, "base64");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=original.pdf");
      return res.send(orig);
    }

    const modifiedBase64 = await modifyPdf(pdfBase64, detections, action);
    const modifiedBuffer = Buffer.from(modifiedBase64, "base64");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=modified.pdf");
    res.send(modifiedBuffer);
  } catch (error) {
    console.error("PDF modify error:", error);
    res.status(500).json({ error: error.message || "Error modifying PDF" });
  }
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: err.message || "Internal server error",
  });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.path,
  });
});

/**
 * Mock function to get user profile (replace with real auth)
 */
function getMockUserProfile(userId) {
  if (!userId) return null;

  // This is a mock implementation
  const mockProfiles = {
    123: {
      userId: "123",
      fullName: "Tanashvi Pujari",
      email: "tanashvipujari@gmail.com",
      phone: "+91XXXXXXXX",
      location: "Pune, Maharashtra",
    },
    456: {
      userId: "456",
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "+1-555-123-4567",
      location: "New York, USA",
    },
  };

  return mockProfiles[userId] || null;
}

/**
 * Start server
 */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════════════════════════╗
    ║     GuardLY Document Privacy Scanner - Running 🛡️        ║
    ╠═══════════════════════════════════════════════════════════╣
    ║ Server: http://localhost:${PORT}                         ║
    ║ API Base: http://localhost:${PORT}/api                   ║
    ╠═══════════════════════════════════════════════════════════╣
    ║ Endpoints:                                                ║
    ║ • POST /api/scan/upload - Scan uploaded document         ║
    ║ • POST /api/scan/url - Scan document from URL            ║
    ║ • GET  /api/health - Health check                        ║
    ╚═══════════════════════════════════════════════════════════╝
  `);
  });
}

module.exports = app;
