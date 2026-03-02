/**
 * Text Extractor Module
 * Handles extraction of text from various document formats (PDF, DOCX, TXT, URL)
 */

const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const axios = require("axios");

class TextExtractor {
  /**
   * Extract text from a file path
   * @param {string} filePath - Path to the document file
   * @returns {Promise<Object>} { text: string, pages: Array, fileType: string }
   */
  static async extractFromFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    try {
      switch (ext) {
        case ".pdf":
          return await this.extractFromPDF(filePath);
        case ".docx":
          return await this.extractFromDOCX(filePath);
        case ".txt":
          return await this.extractFromTXT(filePath);
        default:
          throw new Error(`Unsupported file format: ${ext}`);
      }
    } catch (error) {
      throw new Error(`Error extracting from file: ${error.message}`);
    }
  }

  /**
   * Extract text from PDF
   * @param {string} filePath - Path to PDF file
   * @returns {Promise<Object>} { text: string, pages: Array, fileType: string }
   */
  static async extractFromPDF(filePath) {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);

      const pages = [];
      let fullText = "";

      // Extract text from each page
      for (let i = 0; i < data.numpages; i++) {
        const pageBuffer = dataBuffer.slice(0);
        pages[i] = {
          pageNumber: i + 1,
          text: data.text || "",
        };
      }

      // For more detailed page extraction, you might need to use pdf-lib or pdfjs
      // For now, we'll use a simpler approach
      fullText = data.text;

      return {
        text: fullText,
        pages: this._divideIntoPages(fullText),
        fileType: "pdf",
      };
    } catch (error) {
      throw new Error(`PDF extraction failed: ${error.message}`);
    }
  }

  /**
   * Extract text from DOCX
   * @param {string} filePath - Path to DOCX file
   * @returns {Promise<Object>} { text: string, pages: Array, fileType: string }
   */
  static async extractFromDOCX(filePath) {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      const fullText = result.value;

      return {
        text: fullText,
        pages: this._divideIntoPages(fullText),
        fileType: "docx",
      };
    } catch (error) {
      throw new Error(`DOCX extraction failed: ${error.message}`);
    }
  }

  /**
   * Extract text from plain text file
   * @param {string} filePath - Path to TXT file
   * @returns {Promise<Object>} { text: string, pages: Array, fileType: string }
   */
  static async extractFromTXT(filePath) {
    try {
      const fullText = fs.readFileSync(filePath, "utf-8");

      return {
        text: fullText,
        pages: this._divideIntoPages(fullText),
        fileType: "txt",
      };
    } catch (error) {
      throw new Error(`TXT extraction failed: ${error.message}`);
    }
  }

  /**
   * Extract text from a public URL
   * @param {string} url - URL of the document
   * @returns {Promise<Object>} { text: string, pages: Array, fileType: string }
   */
  static async extractFromURL(url) {
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
        timeout: 30000,
      });

      const contentType = response.headers["content-type"] || "";
      let data;

      if (contentType.includes("pdf")) {
        data = await pdfParse(response.data);
        return {
          text: data.text,
          pages: this._divideIntoPages(data.text),
          fileType: "pdf",
        };
      } else if (contentType.includes("text")) {
        const fullText = response.data.toString("utf-8");
        return {
          text: fullText,
          pages: this._divideIntoPages(fullText),
          fileType: "txt",
        };
      } else {
        throw new Error(`Unsupported URL content type: ${contentType}`);
      }
    } catch (error) {
      throw new Error(`URL extraction failed: ${error.message}`);
    }
  }

  /**
   * Divide extracted text into pages (approximate for non-PDF documents)
   * @param {string} fullText - Complete extracted text
   * @returns {Array} Array of page objects with pageNumber and text
   */
  static _divideIntoPages(fullText) {
    // Simple heuristic: divide by common page breaks or by character count
    const pageSize = 3000; // Approximate characters per page
    const pages = [];

    if (fullText.length === 0) {
      return [{ pageNumber: 1, text: "" }];
    }

    let pageNum = 1;
    for (let i = 0; i < fullText.length; i += pageSize) {
      pages.push({
        pageNumber: pageNum++,
        text: fullText.substring(i, Math.min(i + pageSize, fullText.length)),
      });
    }

    return pages.length > 0 ? pages : [{ pageNumber: 1, text: fullText }];
  }
}

module.exports = TextExtractor;
