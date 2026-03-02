# GuardLY Document Privacy Scanner - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Git (optional)

---

## Option 1: Local Development

### 1. Installation

```bash
# Navigate to project directory
cd doc-scan

# Install dependencies
npm install
```

### 2. Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

**Expected Output:**

```
╔═══════════════════════════════════════════════════════════╗
║     GuardLY Document Privacy Scanner - Running 🛡️        ║
╠═══════════════════════════════════════════════════════════╣
║ Server: http://localhost:3001                           ║
║ API Base: http://localhost:3001/api                     ║
╚═══════════════════════════════════════════════════════════╝
```

### 3. Test the API

```bash
# Health check
curl http://localhost:3001/api/health

# Expected response
{
  "status": "ok",
  "service": "GuardLY Document Scanner",
  "version": "1.0.0",
  "timestamp": "2026-01-20T10:30:00Z"
}
```

---

## Option 2: Docker

### 1. Build & Run with Docker

```bash
# Using docker-compose (recommended)
docker-compose up -d

# Or with Docker directly
docker build -t guardly-scanner .
docker run -p 3001:3001 guardly-scanner
```

### 2. Access Service

```
http://localhost:3001
```

### 3. View Logs

```bash
docker-compose logs -f
# or
docker logs -f <container-id>
```

### 4. Stop Service

```bash
docker-compose down
```

---

## 📋 First Scan Example

### Using cURL

```bash
# 1. Create a test file
echo "My name is Tanashvi Pujari. Contact me at tanashvipujari@gmail.com or +919876543210." > test.txt

# 2. Scan the document
curl -X POST http://localhost:3001/api/scan/upload \
  -F "document=@test.txt" \
  -F 'userProfile={"userId":"123","fullName":"Tanashvi Pujari","email":"tanashvipujari@gmail.com","phone":"+919876543210","location":"Pune, Maharashtra"}'
```

### Using JavaScript

```javascript
// test-scan.js
const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");

async function testScan() {
  const formData = new FormData();
  formData.append("document", fs.createReadStream("test.txt"));
  formData.append(
    "userProfile",
    JSON.stringify({
      userId: "123",
      fullName: "Tanashvi Pujari",
      email: "tanashvipujari@gmail.com",
      phone: "+919876543210",
      location: "Pune, Maharashtra",
    }),
  );

  const response = await fetch("http://localhost:3001/api/scan/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  console.log(JSON.stringify(result, null, 2));
}

testScan();
```

### Expected Result

```json
{
  "success": true,
  "data": {
    "riskScore": 70,
    "riskLevel": "HIGH",
    "matchedData": {
      "name": true,
      "email": true,
      "phone": true,
      "location": false
    },
    "occurrences": {
      "name": [1],
      "email": [1],
      "phone": [1],
      "location": []
    }
  }
}
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```
PORT=3001
NODE_ENV=development
```

### Supported File Types

- 📄 PDF (.pdf)
- 📝 Word Documents (.docx)
- 📋 Text Files (.txt)

### File Size Limits

- Maximum: 50MB per file
- Recommended: < 10MB for optimal performance

---

## 📚 Project Structure

```
doc-scan/
├── src/
│   ├── server.js                    # Express API server
│   └── modules/
│       ├── textExtractor.js         # Document text extraction
│       ├── entityDetector.js        # PII detection
│       ├── userMatcher.js           # Profile matching
│       ├── riskCalculator.js        # Risk scoring
│       └── documentScannerService.js # Main orchestrator
├── uploads/                         # Temporary file storage
├── package.json                     # Dependencies
├── Dockerfile                       # Docker configuration
├── docker-compose.yml              # Docker Compose config
├── README.md                        # Full documentation
├── API_DOCUMENTATION.md            # API reference
├── TESTING.md                       # Test cases
├── CLIENT_EXAMPLE.jsx              # React component example
└── .gitignore                       # Git ignore rules
```

---

## 🧪 Testing the Scanner

### Test Case 1: Full Profile Match

```bash
cat << 'EOF' > resume.txt
Resume - Tanashvi Pujari
Email: tanashvipujari@gmail.com
Phone: +919876543210
Location: Pune, Maharashtra
EOF

curl -X POST http://localhost:3001/api/scan/upload \
  -F "document=@resume.txt" \
  -F 'userProfile={"userId":"123","fullName":"Tanashvi Pujari","email":"tanashvipujari@gmail.com","phone":"+919876543210","location":"Pune, Maharashtra"}'
```

**Expected Result:** All fields matched, Risk Score: 85 (HIGH)

### Test Case 2: Partial Match (Initials)

```bash
cat << 'EOF' > document.txt
Document prepared by: T. P.
EOF

curl -X POST http://localhost:3001/api/scan/upload \
  -F "document=@document.txt" \
  -F 'userProfile={"userId":"123","fullName":"Tanashvi Pujari","email":"tanashvipujari@gmail.com","phone":"+919876543210","location":"Pune, Maharashtra"}'
```

**Expected Result:** Name matched via initials, Risk Score: 15 (LOW)

### Test Case 3: Other Person's Data (Should be Ignored)

```bash
cat << 'EOF' > report.txt
Report prepared by: John Smith
Contact: john@example.com
EOF

curl -X POST http://localhost:3001/api/scan/upload \
  -F "document=@report.txt" \
  -F 'userProfile={"userId":"123","fullName":"Tanashvi Pujari","email":"tanashvipujari@gmail.com","phone":"+919876543210","location":"Pune, Maharashtra"}'
```

**Expected Result:** No matches, Risk Score: 0 (LOW)

---

## 📊 Understanding the Output

### Risk Score Components

```
Name detected:     +15 points
Email detected:    +25 points
Phone detected:    +30 points
Location detected: +15 points
────────────────────────────
Maximum Score:    100 points
```

### Risk Levels

| Score  | Level       | Action                |
| ------ | ----------- | --------------------- |
| 0-30   | 🟢 LOW      | No action needed      |
| 31-60  | 🟡 MEDIUM   | Review document       |
| 61-85  | 🟠 HIGH     | Consider redacting    |
| 86-100 | 🔴 CRITICAL | Redact before sharing |

---

## 🔍 Debugging

### Enable Verbose Logging

```javascript
// In src/modules/documentScannerService.js
console.log("Detected entities:", entities);
console.log("Matched data:", matches);
console.log("Final result:", scanReport);
```

### Check File Upload

```bash
ls -la uploads/  # See uploaded files
```

### Test Individual Modules

```javascript
// test-modules.js
const TextExtractor = require("./src/modules/textExtractor");
const EntityDetector = require("./src/modules/entityDetector");

async function testModules() {
  // Extract text
  const { text, pages } = await TextExtractor.extractFromFile("./test.txt");
  console.log("Extracted text:", text);

  // Detect entities
  const entities = EntityDetector.detectEntities(text);
  console.log("Detected entities:", entities);
}

testModules();
```

---

## 🚨 Troubleshooting

### Server won't start

```bash
# Check if port 3001 is in use
lsof -i :3001

# Use different port
PORT=3002 npm start
```

### File upload fails

```bash
# Check uploads directory exists
mkdir -p uploads

# Check permissions
chmod 755 uploads
```

### No matches detected

- Verify user profile data matches document content
- Check for case sensitivity (should be case-insensitive)
- Review TESTING.md for edge cases

### Slow processing

- Reduce file size < 10MB
- Check system resources
- Enable production mode: `NODE_ENV=production npm start`

---

## 📖 Next Steps

1. **Read Full Documentation**: See [README.md](README.md)
2. **API Reference**: Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. **Test Cases**: Review [TESTING.md](TESTING.md)
4. **Integrate Frontend**: Use [CLIENT_EXAMPLE.jsx](CLIENT_EXAMPLE.jsx)
5. **Deploy**: Use Docker or deploy to cloud

---

## 🛠️ Common Commands

```bash
# Start server
npm start

# Development with auto-reload
npm run dev

# Stop server
Ctrl + C

# View help
npm run

# Check Node version
node --version

# Check npm version
npm --version
```

---

## 📞 Support

- 📧 Email: support@guardly.io
- 🐛 Report Issues: GitHub Issues
- 💬 Community: Discord/Slack Channel
- 📚 Docs: https://docs.guardly.io

---

## ✅ You're All Set! 🎉

Your GuardLY Document Privacy Scanner is now ready to scan documents securely.

**Next:** Make your first API call to `/api/health` to confirm everything is working!

```bash
curl http://localhost:3001/api/health
```

Happy scanning! 🛡️
