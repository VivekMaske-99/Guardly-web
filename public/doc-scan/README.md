# GuardLY Document Privacy Scanner

A production-ready backend system for scanning documents and extracting ONLY the personal data that belongs to the currently logged-in user.

## Features

✨ **User-Centric Scanning**

- Extracts only data matching the logged-in user's profile
- Ignores unrelated names, emails, phone numbers of other people

🔍 **Multi-Format Support**

- PDF documents
- DOCX (Word) documents
- Plain text files
- Public document URLs

🧠 **Intelligent Entity Detection**

- Full name and partial name variations
- Email addresses
- Phone numbers (multiple formats)
- Locations (city/state level)

⚙️ **Modular Architecture**

- `textExtractor.js` - Document text extraction
- `entityDetector.js` - Sensitive data detection
- `userMatcher.js` - Profile matching with fuzzy logic
- `riskCalculator.js` - Risk score computation

📊 **Risk Assessment**

- Privacy risk scoring (0-100)
- Risk level classification (LOW, MEDIUM, HIGH, CRITICAL)
- Detailed breakdown by data type
- Actionable recommendations

🔐 **Security**

- In-memory processing only
- No permanent document storage
- Automatic file cleanup after scanning
- User-specific data isolation

## Installation

```bash
# Install dependencies
npm install

# Start the server
npm start

# Development mode with auto-reload
npm run dev
```

## API Endpoints

### Health Check

```http
GET /api/health
```

Returns server status and service version.

### Scan Uploaded Document

```http
POST /api/scan/upload
Content-Type: multipart/form-data

document: <file>
userId: "123"
userProfile: {"userId":"123","fullName":"Tanashvi Pujari","email":"tanashvipujari@gmail.com","phone":"+91XXXXXXXX","location":"Pune, Maharashtra"}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "source": "file",
    "fileType": "pdf",
    "timestamp": "2026-01-20T10:30:00Z",
    "userId": "123",
    "matchedData": {
      "name": true,
      "email": true,
      "phone": false,
      "location": true
    },
    "occurrences": {
      "name": [1, 3],
      "email": [2],
      "phone": [],
      "location": [1]
    },
    "riskScore": 55,
    "riskLevel": "MEDIUM",
    "recommendations": [
      "Your full name is exposed in this document. Consider redacting or removing personal identifiers."
    ],
    "extractedTextSnippets": [
      {
        "type": "name",
        "matchedText": "Tanashvi Pujari",
        "snippet": "...",
        "context": "..."
      }
    ],
    "pageCount": 5,
    "details": {
      "pagesScanned": [...]
    }
  }
}
```

### Scan Document from URL

```http
POST /api/scan/url
Content-Type: application/json

{
  "url": "https://example.com/document.pdf",
  "userProfile": {
    "userId": "123",
    "fullName": "Tanashvi Pujari",
    "email": "tanashvipujari@gmail.com",
    "phone": "+91XXXXXXXX",
    "location": "Pune, Maharashtra"
  }
}
```

## Risk Score Calculation

| Data Type         | Risk Points |
| ----------------- | ----------- |
| Name Found        | +15         |
| Email Found       | +25         |
| Phone Found       | +30         |
| Location Found    | +15         |
| **Maximum Score** | **100**     |

### Risk Levels

- **0-30**: LOW - Minimal privacy risk
- **31-60**: MEDIUM - Moderate privacy risk
- **61-85**: HIGH - Significant privacy risk
- **86-100**: CRITICAL - Severe privacy risk

## Matching Logic

### Names

- ✅ Exact match (case-insensitive)
- ✅ Partial matches (first/last name components)
- ✅ Initial matching (e.g., "T. P." → "Tanashvi Pujari")

### Emails

- ✅ Exact match (case-insensitive)

### Phone Numbers

- ✅ Exact numeric match
- ✅ Masked equivalent (last 10 digits)
- ✅ Multiple formats supported (E.164, regional formats)

### Locations

- ✅ City-level match
- ✅ State/Province-level match
- ✅ Case-insensitive matching

## Architecture

```
src/
├── server.js                 # Express app & API endpoints
└── modules/
    ├── textExtractor.js      # PDF/DOCX/TXT parsing
    ├── entityDetector.js     # PII/sensitive data detection
    ├── userMatcher.js        # Profile matching logic
    ├── riskCalculator.js     # Risk scoring
    └── documentScannerService.js  # Main orchestrator
```

## Security Features

1. **No Persistent Storage**
   - Documents processed in memory only
   - Files deleted immediately after scanning
   - No database storage of raw documents

2. **User Isolation**
   - Scanning extracts only user-specific data
   - Other people's information explicitly ignored
   - No data leakage between users

3. **Input Validation**
   - File type validation (whitelist approach)
   - File size limits (50MB default)
   - URL validation and timeout protection

4. **Error Handling**
   - Safe error messages (no sensitive data in logs)
   - Graceful degradation
   - Request timeout protection

## Configuration

Environment variables (create `.env` file):

```
PORT=3001
NODE_ENV=development
```

## Usage Example

### JavaScript/Node.js

```javascript
const DocumentScannerService = require("./src/modules/documentScannerService");

const userProfile = {
  userId: "123",
  fullName: "Tanashvi Pujari",
  email: "tanashvipujari@gmail.com",
  phone: "+91XXXXXXXX",
  location: "Pune, Maharashtra",
};

// Scan a file
const result = await DocumentScannerService.scanFile(
  "./document.pdf",
  userProfile,
);
console.log(`Risk Score: ${result.riskScore}`);
console.log(`Risk Level: ${result.riskLevel}`);
console.log(`Matched Data:`, result.matchedData);

// Scan a URL
const urlResult = await DocumentScannerService.scanURL(
  "https://example.com/doc.pdf",
  userProfile,
);
```

## Frontend Integration

The API returns structured JSON data that can be easily consumed by frontend applications:

```javascript
// React example
const [scanResult, setScanResult] = useState(null);

const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("document", file);
  formData.append("userId", currentUser.id);

  const response = await fetch("/api/scan/upload", {
    method: "POST",
    body: formData,
  });

  const { data } = await response.json();
  setScanResult(data);
};
```

## Development

```bash
# Watch for changes
npm run dev

# Run tests
npm test

# Check code quality
npm run lint
```

## Dependencies

- **express** - Web framework
- **pdf-parse** - PDF text extraction
- **mammoth** - DOCX parsing
- **axios** - HTTP client for URL fetching
- **multer** - File upload handling
- **dotenv** - Environment configuration

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Environment Setup

1. Install Node.js 16+
2. `npm install`
3. Configure `.env` file
4. `npm start`

## Performance Considerations

- **Large Documents**: Processes up to 50MB files
- **Memory Usage**: Streams processed in chunks for large PDFs
- **Concurrent Requests**: Stateless design allows horizontal scaling
- **Response Time**: Typical scan < 2 seconds for standard documents

## Limitations & Future Enhancements

### Current Limitations

- Basic NLP (no ML models)
- English language primarily
- Single-page PDF processing approximated

### Planned Features

- OCR support for scanned images
- Multi-language support
- Machine learning-based entity recognition
- Historical trend analysis
- Dashboard and reporting UI
- Email/Slack notifications
- Document redaction recommendations
- Batch document processing

## License

MIT - GuardLY Document Privacy Scanner

## Support

For issues or questions, contact: support@guardly.io

---

**GuardLY** - Protecting Your Privacy, One Document at a Time 🛡️
