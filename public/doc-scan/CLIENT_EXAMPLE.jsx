/**
 * Client Example - Frontend Integration
 * Shows how to integrate with GuardLY Document Scanner
 */

// React Component Example
const ScannerComponent = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Mock user profile (in real app, get from auth context)
  const userProfile = {
    userId: "123",
    fullName: "Tanashvi Pujari",
    email: "tanashvipujari@gmail.com",
    phone: "+919876543210",
    location: "Pune, Maharashtra",
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const validTypes = [
        "application/pdf",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Invalid file type. Please upload PDF, DOCX, or TXT.");
      }
    }
  };

  const handleScan = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("userProfile", JSON.stringify(userProfile));

      const response = await fetch("/api/scan/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const { success, data, error: apiError } = await response.json();

      if (!success) {
        throw new Error(apiError || "Scan failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
      console.error("Scan error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScanURL = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/scan/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          userProfile,
        }),
      });

      const { success, data, error: apiError } = await response.json();

      if (!success) {
        throw new Error(apiError || "Scan failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <h2>🛡️ GuardLY Document Privacy Scanner</h2>

      {/* File Upload Section */}
      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.docx,.txt"
          disabled={loading}
        />
        <button onClick={handleScan} disabled={!file || loading}>
          {loading ? "Scanning..." : "Scan Document"}
        </button>
      </div>

      {/* URL Scan Section */}
      <div className="url-section">
        <input
          type="url"
          placeholder="Enter document URL"
          onBlur={(e) => {
            if (e.target.value && !loading) {
              handleScanURL(e.target.value);
            }
          }}
          disabled={loading}
        />
      </div>

      {/* Error Display */}
      {error && <div className="error-message">{error}</div>}

      {/* Results Display */}
      {result && (
        <div className="scan-results">
          <div className={`risk-card risk-${result.riskLevel.toLowerCase()}`}>
            <h3>Privacy Risk Report</h3>
            <div className="risk-score">
              <span className="score">{result.riskScore}</span>
              <span className="level">{result.riskLevel}</span>
            </div>
          </div>

          {/* Matched Data */}
          <div className="matched-data">
            <h4>Detected Personal Data</h4>
            <div className="data-grid">
              <DataItem
                label="Name"
                detected={result.matchedData.name}
                pages={result.occurrences.name}
              />
              <DataItem
                label="Email"
                detected={result.matchedData.email}
                pages={result.occurrences.email}
              />
              <DataItem
                label="Phone"
                detected={result.matchedData.phone}
                pages={result.occurrences.phone}
              />
              <DataItem
                label="Location"
                detected={result.matchedData.location}
                pages={result.occurrences.location}
              />
            </div>
          </div>

          {/* Risk Breakdown */}
          <div className="risk-breakdown">
            <h4>Risk Score Breakdown</h4>
            <ul>
              <li>
                Name: {result.riskBreakdown.nameScore}
                {result.matchedData.name ? " ⚠️" : " ✓"}
              </li>
              <li>
                Email: {result.riskBreakdown.emailScore}
                {result.matchedData.email ? " ⚠️" : " ✓"}
              </li>
              <li>
                Phone: {result.riskBreakdown.phoneScore}
                {result.matchedData.phone ? " ⚠️" : " ✓"}
              </li>
              <li>
                Location: {result.riskBreakdown.locationScore}
                {result.matchedData.location ? " ⚠️" : " ✓"}
              </li>
            </ul>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="recommendations">
              <h4>📋 Recommendations</h4>
              <ul>
                {result.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Text Snippets */}
          {result.extractedTextSnippets.length > 0 && (
            <div className="snippets">
              <h4>📄 Found Instances</h4>
              {result.extractedTextSnippets.map((snippet, i) => (
                <div key={i} className="snippet">
                  <span className={`type ${snippet.type}`}>{snippet.type}</span>
                  <p className="matched">{snippet.matchedText}</p>
                  <p className="context">{snippet.context}</p>
                </div>
              ))}
            </div>
          )}

          {/* Page Details */}
          <div className="page-details">
            <h4>📑 Scanned Pages: {result.pageCount}</h4>
            {result.details.pagesScanned.map((page) => (
              <div key={page.pageNumber} className="page-item">
                <span className="page-num">Page {page.pageNumber}</span>
                <span className="data-found">
                  {[
                    page.matchedData.name && "👤",
                    page.matchedData.email && "📧",
                    page.matchedData.phone && "📱",
                    page.matchedData.location && "📍",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Component
const DataItem = ({ label, detected, pages }) => (
  <div className={`data-item ${detected ? "detected" : "safe"}`}>
    <span className="label">{label}</span>
    {detected ? (
      <>
        <span className="status">⚠️ Found</span>
        <span className="pages">Page(s): {pages.join(", ")}</span>
      </>
    ) : (
      <span className="status">✓ Not Found</span>
    )}
  </div>
);

export default ScannerComponent;
