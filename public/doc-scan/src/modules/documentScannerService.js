/**
 * Document Scanner Service
 * Main orchestrator that coordinates all modules
 */

const TextExtractor = require("./textExtractor");
const EntityDetector = require("./entityDetector");
const UserMatcher = require("./userMatcher");
const RiskCalculator = require("./riskCalculator");
const fs = require("fs");
const path = require("path");

class DocumentScannerService {
  /**
   * Scan document from file
   * @param {string} filePath - Path to the document
   * @param {Object} userProfile - Logged-in user's profile
   * @returns {Promise<Object>} Scan results
   */
  static async scanFile(filePath, userProfile) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    if (!userProfile || !userProfile.fullName) {
      throw new Error("Invalid user profile");
    }

    // Extract text from document
    const extractedData = await TextExtractor.extractFromFile(filePath);

    // Process the extracted data
    return this._processScanData(extractedData, userProfile, "file");
  }

  /**
   * Scan document from URL
   * @param {string} url - URL to the document
   * @param {Object} userProfile - Logged-in user's profile
   * @returns {Promise<Object>} Scan results
   */
  static async scanURL(url, userProfile) {
    if (!url || typeof url !== "string") {
      throw new Error("Invalid URL provided");
    }

    if (!userProfile || !userProfile.fullName) {
      throw new Error("Invalid user profile");
    }

    // Extract text from URL
    const extractedData = await TextExtractor.extractFromURL(url);

    // Process the extracted data
    return this._processScanData(extractedData, userProfile, "url");
  }

  /**
   * Process extracted data through all detection and matching modules
   * @param {Object} extractedData - Data from TextExtractor
   * @param {Object} userProfile - User's profile
   * @param {string} source - Source of document (file or url)
   * @returns {Object} Complete scan report
   */
  static _processScanData(extractedData, userProfile, source) {
    const { text, pages, fileType } = extractedData;

    // Initialize result structure
    const scanReport = {
      source,
      fileType,
      timestamp: new Date().toISOString(),
      userId: userProfile.userId,
      matchedData: {
        name: false,
        email: false,
        phone: false,
        location: false,
      },
      occurrences: {
        name: [],
        email: [],
        phone: [],
        location: [],
      },
      riskScore: 0,
      riskLevel: "LOW",
      recommendations: [],
      extractedTextSnippets: [],
      pageCount: pages.length,
      details: {
        pagesScanned: [],
      },
    };

    // Process each page
    pages.forEach((pageData) => {
      const pageDetail = {
        pageNumber: pageData.pageNumber,
        matchedData: {
          name: false,
          email: false,
          phone: false,
          location: false,
        },
        snippets: [],
      };

      // Detect entities in page text
      const entities = EntityDetector.detectEntities(pageData.text);

      // Match entities against user profile
      const matches = UserMatcher.matchEntities(
        entities,
        userProfile,
        pageData.text,
      );

      // Update page-level data
      pageDetail.matchedData = matches.matchedData;
      pageDetail.snippets = matches.snippets;

      // Update global matched data (OR logic - if matched on any page)
      if (matches.matchedData.name) scanReport.matchedData.name = true;
      if (matches.matchedData.email) scanReport.matchedData.email = true;
      if (matches.matchedData.phone) scanReport.matchedData.phone = true;
      if (matches.matchedData.location) scanReport.matchedData.location = true;

      // Track occurrences by page
      if (
        matches.matchedData.name &&
        !scanReport.occurrences.name.includes(pageData.pageNumber)
      ) {
        scanReport.occurrences.name.push(pageData.pageNumber);
      }
      if (
        matches.matchedData.email &&
        !scanReport.occurrences.email.includes(pageData.pageNumber)
      ) {
        scanReport.occurrences.email.push(pageData.pageNumber);
      }
      if (
        matches.matchedData.phone &&
        !scanReport.occurrences.phone.includes(pageData.pageNumber)
      ) {
        scanReport.occurrences.phone.push(pageData.pageNumber);
      }
      if (
        matches.matchedData.location &&
        !scanReport.occurrences.location.includes(pageData.pageNumber)
      ) {
        scanReport.occurrences.location.push(pageData.pageNumber);
      }

      // Collect snippets
      scanReport.extractedTextSnippets.push(...matches.snippets);
      scanReport.details.pagesScanned.push(pageDetail);
    });

    // Calculate risk score
    const riskData = RiskCalculator.calculateRisk(
      scanReport.matchedData,
      scanReport.extractedTextSnippets,
    );

    scanReport.riskScore = riskData.riskScore;
    scanReport.riskLevel = riskData.riskLevel;
    scanReport.riskBreakdown = riskData.breakdown;
    scanReport.recommendations = RiskCalculator.getRecommendations(
      scanReport.matchedData,
      riskData.riskScore,
    );

    // Clean up: Do NOT store the actual document text
    delete scanReport.documentText;

    return scanReport;
  }
}

module.exports = DocumentScannerService;
