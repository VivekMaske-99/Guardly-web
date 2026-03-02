# GuardLY Document Privacy Scanner

## Complete Implementation Guide

---

## 📖 Documentation Index

### Getting Started

1. **[QUICKSTART.md](QUICKSTART.md)** ⭐ START HERE
   - 5-minute setup guide
   - First API call examples
   - Quick troubleshooting

2. **[README.md](README.md)**
   - Full feature documentation
   - Installation instructions
   - Architecture overview
   - Security features
   - Performance metrics

### Technical Documentation

3. **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)**
   - Complete API reference
   - Endpoint specifications
   - Request/response examples
   - Error handling
   - cURL & JavaScript examples

4. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)**
   - Project architecture
   - Data flow diagrams
   - Matching logic details
   - Risk scoring algorithm
   - File structure overview

### Testing & Development

5. **[TESTING.md](TESTING.md)**
   - Test cases & examples
   - User profiles for testing
   - Expected outputs
   - Edge cases
   - Performance benchmarks
   - Debugging tips

6. **[CLIENT_EXAMPLE.jsx](CLIENT_EXAMPLE.jsx)**
   - React component integration
   - Frontend implementation
   - Error handling
   - UI/UX patterns

---

## 🚀 Quick Start (Copy & Paste)

### Windows

```bash
# 1. Run setup
setup.bat

# 2. Start server
npm start

# 3. Test in new terminal
curl http://localhost:3001/api/health
```

### macOS/Linux

```bash
# 1. Run setup
bash setup.sh

# 2. Start server
npm start

# 3. Test in new terminal
curl http://localhost:3001/api/health
```

### Docker

```bash
# One command to run
docker-compose up -d

# Access at http://localhost:3001
```

---

## 📋 Project Structure

```
doc-scan/
├── src/
│   ├── server.js                              (Express API)
│   └── modules/
│       ├── textExtractor.js                   (PDF/DOCX/TXT parsing)
│       ├── entityDetector.js                  (PII detection)
│       ├── userMatcher.js                     (Profile matching)
│       ├── riskCalculator.js                  (Risk scoring)
│       └── documentScannerService.js          (Orchestrator)
│
├── uploads/                                   (Temporary files)
│
├── Documentation/
│   ├── README.md                              (Full docs)
│   ├── QUICKSTART.md                          (5-min setup)
│   ├── API_DOCUMENTATION.md                   (API reference)
│   ├── PROJECT_SUMMARY.md                     (Architecture)
│   ├── TESTING.md                             (Test cases)
│   └── CLIENT_EXAMPLE.jsx                     (React example)
│
├── Deployment/
│   ├── Dockerfile                             (Docker image)
│   ├── docker-compose.yml                     (Docker Compose)
│   └── .env.example                           (Config template)
│
├── Setup/
│   ├── setup.sh                               (Linux/macOS)
│   ├── setup.bat                              (Windows)
│   └── package.json                           (Dependencies)
│
└── Config/
    ├── .gitignore                             (Git ignore)
    └── INDEX.md                               (This file)
```

---

## 🎯 Core Functionality

### What It Does

✅ Uploads or fetches documents (PDF, DOCX, TXT, URL)
✅ Extracts text intelligently from multi-page documents
✅ Detects sensitive data (names, emails, phones, locations)
✅ Matches ONLY against logged-in user's profile
✅ Ignores other people's data
✅ Calculates privacy risk score (0-100)
✅ Returns page-level tracking
✅ Provides actionable recommendations
✅ No permanent document storage

### What Makes It Special

🔒 User-centric (not extracting everyone's data)
🧠 Fuzzy matching (handles variations & partial matches)
📊 Detailed risk analysis with explanations
🔐 Security-first design (in-memory only)
⚡ Fast processing (< 2 seconds typical)
📦 Production-ready code quality

---

## 🔄 API Endpoints

### 1. Health Check

```http
GET /api/health
```

✅ Verify server is running

### 2. Upload & Scan

```http
POST /api/scan/upload
```

📄 Upload document file + scan for user data

### 3. URL Scan

```http
POST /api/scan/url
```

🌐 Scan public document URL

---

## 📊 Risk Score Breakdown

| Data Type | Points  | When It Triggers                    |
| --------- | ------- | ----------------------------------- |
| Name      | 15      | User's name found in document       |
| Email     | 25      | User's email found in document      |
| Phone     | 30      | User's phone found in document      |
| Location  | 15      | User's city/state found in document |
| **TOTAL** | **100** | All 4 items found                   |

### Risk Levels

| Score  | Level       | Indicator | Meaning                  |
| ------ | ----------- | --------- | ------------------------ |
| 0-30   | 🟢 LOW      | Green     | Minimal privacy risk     |
| 31-60  | 🟡 MEDIUM   | Yellow    | Moderate privacy risk    |
| 61-85  | 🟠 HIGH     | Orange    | Significant privacy risk |
| 86-100 | 🔴 CRITICAL | Red       | Severe privacy risk      |

---

## 🔐 Security Features

✅ **In-Memory Processing**

- No database storage of documents
- No permanent file caching
- Automatic cleanup after scanning

✅ **User Isolation**

- Extract only user-specific data
- Ignore unrelated people's information
- No cross-user data leakage

✅ **File Security**

- Uploaded files deleted after scanning
- Temporary storage cleaned
- Whitelist file types only

✅ **Input Validation**

- File type validation (PDF, DOCX, TXT)
- 50MB file size limit
- URL format validation
- Timeout protection

✅ **Error Handling**

- Safe error messages
- No sensitive data in logs
- Graceful degradation

---

## 💾 Installation Methods

### Method 1: npm (Fastest)

```bash
npm install
npm start
```

### Method 2: Docker (Recommended)

```bash
docker-compose up -d
```

### Method 3: Setup Scripts

```bash
# Windows
setup.bat

# Linux/macOS
bash setup.sh
```

---

## 🧪 Test the System

### Create Test File

```bash
echo "My name is Tanashvi Pujari. Email: tanashvipujari@gmail.com" > test.txt
```

### Scan It

```bash
curl -X POST http://localhost:3001/api/scan/upload \
  -F "document=@test.txt" \
  -F 'userProfile={"userId":"123","fullName":"Tanashvi Pujari","email":"tanashvipujari@gmail.com","phone":"+919876543210","location":"Pune, Maharashtra"}'
```

### Expected Result

```json
{
  "success": true,
  "data": {
    "riskScore": 40,
    "riskLevel": "MEDIUM",
    "matchedData": {
      "name": true,
      "email": true,
      "phone": false,
      "location": false
    }
  }
}
```

---

## 🛠️ Development

### Start Development Server

```bash
npm run dev    # Auto-reloads on changes
```

### Debug Individual Modules

```javascript
// Test text extraction
const TextExtractor = require("./src/modules/textExtractor");
const data = await TextExtractor.extractFromFile("./doc.pdf");

// Test entity detection
const EntityDetector = require("./src/modules/entityDetector");
const entities = EntityDetector.detectEntities(data.text);

// Test matching
const UserMatcher = require("./src/modules/userMatcher");
const matches = UserMatcher.matchEntities(entities, userProfile, data.text);
```

### Check Logs

```bash
# Server logs show all requests and errors
# Check console output while running npm start
```

---

## 📦 Dependencies

| Package       | Purpose                   |
| ------------- | ------------------------- |
| **express**   | Web framework             |
| **pdf-parse** | PDF text extraction       |
| **mammoth**   | DOCX/Word parsing         |
| **axios**     | HTTP client for URLs      |
| **multer**    | File upload handling      |
| **dotenv**    | Environment configuration |

---

## 🌐 Deployment

### Production Checklist

```
✅ Install Node.js 16+
✅ npm install (production)
✅ Configure .env
✅ Set NODE_ENV=production
✅ Use Docker/container
✅ Configure reverse proxy
✅ Enable HTTPS/SSL
✅ Set up rate limiting
✅ Configure monitoring
✅ Test all endpoints
✅ Document API keys
```

### Cloud Deployment

- **Heroku**: `git push heroku main`
- **AWS**: Use EC2 or ECS with Docker
- **Google Cloud**: Cloud Run or Compute Engine
- **Azure**: App Service or Container Instances

---

## 📞 Support & Resources

### Documentation

- 📚 Full README: [README.md](README.md)
- 🚀 Quick Start: [QUICKSTART.md](QUICKSTART.md)
- 📡 API Reference: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- 🏗️ Architecture: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- 🧪 Test Cases: [TESTING.md](TESTING.md)

### Troubleshooting

1. **Server won't start**: Check if port 3001 is in use
2. **File upload fails**: Verify file type is PDF/DOCX/TXT
3. **No matches detected**: Check user profile data
4. **Processing too slow**: Reduce file size, check CPU/RAM

### Common Commands

```bash
npm start           # Start production server
npm run dev         # Start with auto-reload
npm install         # Install dependencies
docker-compose up   # Start with Docker
curl /api/health    # Test API
```

---

## 🎓 Learning Path

### New to This Project?

1. Read [QUICKSTART.md](QUICKSTART.md) (5 min)
2. Run setup & start server (2 min)
3. Make first API call (1 min)
4. Read [README.md](README.md) (10 min)

### Need to Integrate?

1. Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) (15 min)
2. Review [CLIENT_EXAMPLE.jsx](CLIENT_EXAMPLE.jsx) (10 min)
3. Implement in your app (30-60 min)

### Want to Contribute?

1. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) (20 min)
2. Review [TESTING.md](TESTING.md) (15 min)
3. Modify modules and test
4. Submit PR

---

## ✅ Verification Checklist

After setup, verify:

```
☐ npm install completed without errors
☐ Server starts with: npm start
☐ Health check responds: curl /api/health
☐ uploads/ directory exists
☐ .env file is configured
☐ All modules load successfully
☐ Test scan completes successfully
☐ Risk score calculated correctly
☐ Page tracking works
☐ No errors in console
```

---

## 🎯 Next Steps

1. **Setup** → Run `setup.bat` (Windows) or `bash setup.sh` (Linux/macOS)
2. **Start** → Run `npm start`
3. **Test** → Make first API call to `/api/health`
4. **Read** → Review [README.md](README.md) for full details
5. **Integrate** → Use [CLIENT_EXAMPLE.jsx](CLIENT_EXAMPLE.jsx) for frontend
6. **Deploy** → Use Docker or preferred cloud platform

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Client Application                │
└─────────────────────────────────────────────────────┘
                         ↓
                    (HTTP/REST)
                         ↓
┌─────────────────────────────────────────────────────┐
│         Express API Server (server.js)              │
│  POST /api/scan/upload                              │
│  POST /api/scan/url                                 │
│  GET  /api/health                                   │
└─────────────────────────────────────────────────────┘
         ↓              ↓              ↓
    ┌────────────┐ ┌──────────┐ ┌──────────────┐
    │   Text     │ │ Entity   │ │ User Matcher │
    │ Extractor  │ │ Detector │ │ & Risk Calc  │
    └────────────┘ └──────────┘ └──────────────┘
         ↓              ↓              ↓
    ┌─────────────────────────────────────────────┐
    │  Document Scanner Service (Orchestrator)    │
    └─────────────────────────────────────────────┘
         ↓              ↓              ↓
    [PDF Parse] [DOCX Parse] [URL Fetch]
         ↓              ↓              ↓
    ┌─────────────────────────────────────────────┐
    │        Structured JSON Response             │
    │  Risk Score, Matches, Snippets, Pages       │
    └─────────────────────────────────────────────┘
```

---

## 🚀 You're Ready!

**Everything is set up and ready to go!**

Choose your starting point:

- 🏃 **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- 📖 **Full Docs**: [README.md](README.md)
- 🔌 **API Docs**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- 💻 **Code Example**: [CLIENT_EXAMPLE.jsx](CLIENT_EXAMPLE.jsx)

---

**GuardLY - Protecting Your Privacy, One Document at a Time** 🛡️

---

## 📋 Document Glossary

| Term               | Meaning                                      |
| ------------------ | -------------------------------------------- |
| **PII**            | Personally Identifiable Information          |
| **Entity**         | Detected data pattern (name, email, etc.)    |
| **Snippet**        | Text excerpt containing matched data         |
| **Risk Score**     | 0-100 privacy risk assessment                |
| **Matching**       | Comparing detected entities to user profile  |
| **Fuzzy Matching** | Approximate/partial string matching          |
| **OCR**            | Optical Character Recognition                |
| **NLP**            | Natural Language Processing                  |
| **E.164**          | International phone number format            |
| **MIME Type**      | File type identifier (e.g., application/pdf) |

---

**Last Updated**: 2026-01-20
**Version**: 1.0.0
**Status**: ✅ Production Ready
