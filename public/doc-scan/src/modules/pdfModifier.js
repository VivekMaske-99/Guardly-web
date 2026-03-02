const { PDFDocument, rgb } = require("pdf-lib");

async function modifyPdf(pdfBase64, detections = [], action = "redact") {
  const pdfBytes = Buffer.from(pdfBase64, "base64");
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();

  // If action is unmask, just return original
  if (action === "unmask") {
    return pdfBase64;
  }

  for (const det of detections) {
    const pageIndex = Math.max(0, det.page || 0);
    if (pageIndex >= pages.length) continue;

    const page = pages[pageIndex];
    const pageHeight = page.getHeight();
    const pageWidth = page.getWidth();

    // Support normalized coordinates (fractions 0..1) from the client
    // If det.normalized is true, x/y/width/height are relative to page dimensions
    let x, y, width, height;
    if (det.normalized) {
      x = Number(det.x || 0) * pageWidth;
      y = Number(det.y || 0) * pageHeight;
      width = Number(det.width || 0) * pageWidth;
      height = Number(det.height || 0) * pageHeight;
    } else {
      x = Number(det.x) || 0;
      y = Number(det.y) || 0;
      width = Number(det.width) || 0;
      height = Number(det.height) || 0;
    }

    // Assume detections use top-left origin. Convert to PDF bottom-left origin.
    const yPdf = pageHeight - y - height;

    if (action === "redact") {
      page.drawRectangle({ x, y: yPdf, width, height, color: rgb(0, 0, 0) });
    } else if (action === "highlight") {
      page.drawRectangle({
        x,
        y: yPdf,
        width,
        height,
        color: rgb(1, 1, 0),
        opacity: 0.35,
      });
    } else if (action === "mask") {
      // Simple pixelation: draw a grid of small rectangles over the area
      const boxSize = 10; // points
      for (let px = x; px < x + width; px += boxSize) {
        for (let py = yPdf; py < yPdf + height; py += boxSize) {
          const w = Math.min(boxSize, x + width - px);
          const h = Math.min(boxSize, yPdf + height - py);
          // Use a neutral gray to simulate blur/pixelation
          page.drawRectangle({
            x: px,
            y: py,
            width: w,
            height: h,
            color: rgb(0.86, 0.86, 0.86),
          });
        }
      }
    }
  }

  const modifiedBytes = await pdfDoc.save();
  return Buffer.from(modifiedBytes).toString("base64");
}

module.exports = { modifyPdf };
