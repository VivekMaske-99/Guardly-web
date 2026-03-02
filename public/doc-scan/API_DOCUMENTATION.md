# GuardLY Document Privacy Scanner - API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

Currently using mock authentication. Replace with your JWT/OAuth implementation.

---

## Endpoints

### 1. Health Check

**Endpoint:**

```http
GET /api/health
```

**Description:** Verify server status and service availability.

**Response:**

```json
{
  "status": "ok",
  "service": "GuardLY Document Scanner",
  "version": "1.0.0",
  "timestamp": "2026-01-20T10:30:00Z"
}
```

**Status Code:** `200 OK`

---

### 2. Scan Uploaded Document

**Endpoint:**

```http
POST /api/scan/upload
```

**Description:** Upload and scan a document for personal data matching the logged-in user's profile.

**Content-Type:** `multipart/form-data`

**Request Parameters:**

| Parameter     | Type   | Required | Description                                |
| ------------- | ------ | -------- | ------------------------------------------ |
| `document`    | File   | ✅       | Document file (PDF, DOCX, TXT)             |
| `userId`      | string | ✅       | Unique identifier of logged-in user        |
| `userProfile` | JSON   | ❌       | User profile object (if not using session) |

**Request Example:**

```bash
curl -X POST http://localhost:3001/api/scan/upload \
  -F "document=@resume.pdf" \
  -F 'userId=123' \
  -F 'userProfile={"userId":"123","fullName":"Tanashvi Pujari","email":"tanashvipujari@gmail.com","phone":"+919876543210","location":"Pune, Maharashtra"}'
```

**User Profile Schema:**

```json
{
  "userId": "string - unique user identifier",
  "fullName": "string - user's full name",
  "email": "string - user's email address",
  "phone": "string - user's phone number",
  "location": "string - user's city/state (comma-separated)"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "source": "file",
    "fileType": "pdf",
    "timestamp": "2026-01-20T10:30:45Z",
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
    "riskBreakdown": {
      "nameScore": 15,
      "emailScore": 25,
      "phoneScore": 0,
      "locationScore": 15
    },
    "recommendations": [
      "Your full name is exposed in this document. Consider redacting or removing personal identifiers.",
      "Your email address is visible. This could lead to spam or phishing attacks."
    ],
    "extractedTextSnippets": [
      {
        "type": "name",
        "matchedText": "Tanashvi Pujari",
        "snippet": "Resume of Tanashvi Pujari, dated January 2026...",
        "context": "...Resume of Tanashvi Pujari, dated January 2026..."
      },
      {
        "type": "email",
        "matchedText": "tanashvipujari@gmail.com",
        "snippet": "Contact: tanashvipujari@gmail.com",
        "context": "...Contact: tanashvipujari@gmail.com..."
      }
    ],
    "pageCount": 5,
    "snippetsCount": 2,
    "details": {
      "pagesScanned": [
        {
          "pageNumber": 1,
          "matchedData": {
            "name": true,
            "email": false,
            "phone": false,
            "location": true
          },
          "snippets": [
            {
              "type": "name",
              "matchedText": "Tanashvi Pujari",
              "snippet": "...",
              "context": "..."
            }
          ]
        }
      ]
    }
  }
}
```

**Status Codes:**

- `200 OK` - Document successfully scanned
- `400 Bad Request` - Missing required fields or invalid file
- `401 Unauthorized` - User not authenticated or profile not found
- `413 Payload Too Large` - File exceeds 50MB limit
- `415 Unsupported Media Type` - File format not supported
- `500 Internal Server Error` - Server error during processing

**Error Response:**

```json
{
  "error": "No file uploaded"
}
```

---

### 3. Scan Document from URL

**Endpoint:**

```http
POST /api/scan/url
```

**Description:** Fetch and scan a publicly accessible document from a URL.

**Content-Type:** `application/json`

**Request Body:**

```json
{
  "url": "https://example.com/document.pdf",
  "userProfile": {
    "userId": "123",
    "fullName": "Tanashvi Pujari",
    "email": "tanashvipujari@gmail.com",
    "phone": "+919876543210",
    "location": "Pune, Maharashtra"
  }
}
```

**Request Example:**

```bash
curl -X POST http://localhost:3001/api/scan/url \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/document.pdf",
    "userProfile": {
      "userId": "123",
      "fullName": "Tanashvi Pujari",
      "email": "tanashvipujari@gmail.com",
      "phone": "+919876543210",
      "location": "Pune, Maharashtra"
    }
  }'
```

**Response:** (Same structure as `/api/scan/upload`)

**Status Codes:**

- `200 OK` - Document successfully scanned
- `400 Bad Request` - Invalid URL or missing parameters
- `401 Unauthorized` - User profile not provided
- `500 Internal Server Error` - Error fetching or processing URL

**Error Response:**

```json
{
  "error": "URL extraction failed: Network timeout"
}
```

---

### 4. Get Scan History (Future Feature)

**Endpoint:**

```http
GET /api/scans/:userId
```

**Description:** Retrieve historical scan results for a user.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | string | Unique user identifier |

**Response:**

```json
{
  "success": true,
  "userId": "123",
  "scans": [],
  "message": "Scan history feature coming soon"
}
```

**Status Code:** `200 OK`

---

## Response Data Structure

### Matched Data Object

```json
{
  "name": boolean,      // Whether user's name was found
  "email": boolean,     // Whether user's email was found
  "phone": boolean,     // Whether user's phone was found
  "location": boolean   // Whether user's location was found
}
```

### Occurrences Object

```json
{
  "name": [1, 3, 5], // Page numbers where name was found
  "email": [2], // Page numbers where email was found
  "phone": [], // Page numbers where phone was found
  "location": [1, 4] // Page numbers where location was found
}
```

### Risk Score Breakdown

```json
{
  "nameScore": 15, // 0 or 15
  "emailScore": 25, // 0 or 25
  "phoneScore": 30, // 0 or 30
  "locationScore": 15 // 0 or 15
}
```

### Risk Levels

| Score  | Level    | Color     | Description              |
| ------ | -------- | --------- | ------------------------ |
| 0-30   | LOW      | 🟢 Green  | Minimal privacy risk     |
| 31-60  | MEDIUM   | 🟡 Yellow | Moderate privacy risk    |
| 61-85  | HIGH     | 🟠 Orange | Significant privacy risk |
| 86-100 | CRITICAL | 🔴 Red    | Severe privacy risk      |

### Text Snippet Object

```json
{
  "type": "name|email|phone|location",
  "matchedText": "Tanashvi Pujari",
  "snippet": "Resume of Tanashvi Pujari, dated January 2026...",
  "context": "...Resume of Tanashvi Pujari, dated January 2026..."
}
```

### Page Detail Object

```json
{
  "pageNumber": 1,
  "matchedData": {
    "name": true,
    "email": false,
    "phone": false,
    "location": true
  },
  "snippets": [
    {
      "type": "name",
      "matchedText": "Tanashvi",
      "snippet": "...",
      "context": "..."
    }
  ]
}
```

---

## Rate Limiting

Currently not implemented. Recommended limits for production:

```
- 100 requests per minute per user
- 10 concurrent scans per user
- 50MB maximum file size
- 30-second processing timeout
```

---

## Error Handling

All errors follow this standard format:

```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "timestamp": "2026-01-20T10:30:00Z"
}
```

### Common Error Codes

| Code                 | HTTP Status | Description                    |
| -------------------- | ----------- | ------------------------------ |
| `INVALID_FILE_TYPE`  | 415         | Unsupported file format        |
| `FILE_TOO_LARGE`     | 413         | File exceeds size limit        |
| `NO_FILE_UPLOADED`   | 400         | Missing document file          |
| `INVALID_URL`        | 400         | URL format invalid             |
| `USER_NOT_FOUND`     | 401         | User profile not found         |
| `EXTRACTION_FAILED`  | 500         | Error extracting document text |
| `PROCESSING_TIMEOUT` | 500         | Scan took too long             |
| `INVALID_REQUEST`    | 400         | Malformed request              |
| `SERVER_ERROR`       | 500         | Internal server error          |

---

## Security Headers

Recommended headers for production:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## Webhook Support (Future)

For asynchronous scanning:

```http
POST /api/scan/webhook
```

**Request:**

```json
{
  "documentUrl": "https://example.com/doc.pdf",
  "webhookUrl": "https://yourapp.com/callback",
  "userProfile": { ... }
}
```

**Webhook Callback:**

```json
{
  "scanId": "scan_123456",
  "status": "completed",
  "result": { ... }
}
```

---

## Example Integration Code

### JavaScript/Node.js

```javascript
const axios = require("axios");

async function scanDocument(file, userProfile) {
  const formData = new FormData();
  formData.append("document", file);
  formData.append("userProfile", JSON.stringify(userProfile));

  try {
    const response = await axios.post(
      "http://localhost:3001/api/scan/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("Scan failed:", error.response?.data?.error);
    throw error;
  }
}
```

### Python

```python
import requests

def scan_document(file_path, user_profile):
    with open(file_path, 'rb') as f:
        files = {'document': f}
        data = {'userProfile': json.dumps(user_profile)}

        response = requests.post(
            'http://localhost:3001/api/scan/upload',
            files=files,
            data=data
        )

    return response.json()['data']
```

---

## Changelog

### v1.0.0 (2026-01-20)

- ✅ Initial release
- ✅ File upload scanning
- ✅ URL-based scanning
- ✅ Multi-format support (PDF, DOCX, TXT)
- ✅ Entity detection and matching
- ✅ Risk scoring

### v1.1.0 (Planned)

- OCR support for scanned images
- Multi-language support
- ML-based entity recognition
- Batch processing API
- Webhook support
- Admin dashboard

---

## Contact & Support

For API documentation updates or issues:

- 📧 Email: api-support@guardly.io
- 🐛 Issues: https://github.com/guardly/scanner/issues
- 📚 Docs: https://docs.guardly.io
