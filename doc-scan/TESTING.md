# GuardLY Document Privacy Scanner - Test Cases

This file documents test cases and examples for the document scanning system.

## Test User Profiles

### Profile 1: Tanashvi Pujari (India)

```json
{
  "userId": "123",
  "fullName": "Tanashvi Pujari",
  "email": "tanashvipujari@gmail.com",
  "phone": "+919876543210",
  "location": "Pune, Maharashtra"
}
```

### Profile 2: John Smith (USA)

```json
{
  "userId": "456",
  "fullName": "John Smith",
  "email": "john.smith@example.com",
  "phone": "+1-555-123-4567",
  "location": "New York, USA"
}
```

## Example Test Documents

### Test Document 1: Resume with user data

Contains:

- User's full name: "Tanashvi Pujari"
- User's email: "tanashvipujari@gmail.com"
- User's location: "Pune"
- Other person's data (should be ignored): "Raj Kumar", "raj@example.com"

Expected Result:

```json
{
  "matchedData": {
    "name": true,
    "email": true,
    "phone": false,
    "location": true
  },
  "occurrences": {
    "name": [1],
    "email": [1],
    "location": [1]
  },
  "riskScore": 55,
  "riskLevel": "MEDIUM"
}
```

### Test Document 2: Multi-page report

- Page 1: Header with user name "Tanashvi P."
- Page 2: Analysis section
- Page 3: Contact info with email "tanashvipujari@gmail.com" and phone "+919876543210"
- Page 4: Team member list (other people - ignore)

Expected Result:

```json
{
  "matchedData": {
    "name": true,
    "email": true,
    "phone": true,
    "location": false
  },
  "occurrences": {
    "name": [1],
    "email": [3],
    "phone": [3]
  },
  "riskScore": 70,
  "riskLevel": "HIGH"
}
```

## API Test Examples

### cURL Examples

#### 1. Health Check

```bash
curl http://localhost:3001/api/health
```

#### 2. Upload and Scan File

```bash
curl -X POST http://localhost:3001/api/scan/upload \
  -F "document=@/path/to/document.pdf" \
  -F 'userProfile={"userId":"123","fullName":"Tanashvi Pujari","email":"tanashvipujari@gmail.com","phone":"+919876543210","location":"Pune, Maharashtra"}'
```

#### 3. Scan URL

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

### JavaScript/Fetch Examples

#### Upload and Scan

```javascript
async function scanDocument(file, userProfile) {
  const formData = new FormData();
  formData.append("document", file);
  formData.append("userProfile", JSON.stringify(userProfile));

  const response = await fetch("http://localhost:3001/api/scan/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  console.log("Scan Result:", result.data);
  console.log("Risk Score:", result.data.riskScore);
  console.log("Risk Level:", result.data.riskLevel);
}
```

#### Scan from URL

```javascript
async function scanURL(url, userProfile) {
  const response = await fetch("http://localhost:3001/api/scan/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      userProfile,
    }),
  });

  const result = await response.json();
  return result.data;
}
```

## Entity Detection Tests

### Name Detection

- ✅ "Tanashvi Pujari" - Full name
- ✅ "Tanashvi P." - Initial format
- ✅ "T. Pujari" - Initial format
- ✅ "Tanashvi" - First name only (if matching user's first name)
- ✅ "Pujari" - Last name only (if matching user's last name)
- ❌ "Raj Kumar" - Different name (should not match)

### Email Detection

- ✅ "tanashvipujari@gmail.com" - Standard format
- ✅ "TANASHVIPUJARI@GMAIL.COM" - Case variations
- ✅ "tanashvi.pujari@example.com" - Dot notation
- ❌ "other.person@example.com" - Different email

### Phone Detection

- ✅ "+919876543210" - India format with +91
- ✅ "9876543210" - India format without +
- ✅ "+91-98765-43210" - Formatted with dashes
- ✅ "+91 9876543210" - Formatted with spaces
- ✅ "+1-555-123-4567" - US format
- ❌ "9876543211" - Different number

### Location Detection

- ✅ "Pune" - City match
- ✅ "Maharashtra" - State match
- ✅ "Pune, Maharashtra" - Full location
- ✅ "pune" - Case insensitive
- ❌ "Mumbai" - Different city

## Risk Score Validation

### Scenario 1: All data found

```
name: true (15) +
email: true (25) +
phone: true (30) +
location: true (15)
= 85 (HIGH)
```

### Scenario 2: Name and email only

```
name: true (15) +
email: true (25)
= 40 (MEDIUM)
```

### Scenario 3: Phone only

```
phone: true (30)
= 30 (LOW)
```

### Scenario 4: No data found

```
= 0 (LOW)
```

## Performance Benchmarks

Expected performance on standard hardware:

| Document Type       | Size  | Processing Time |
| ------------------- | ----- | --------------- |
| PDF (1 page)        | 500KB | < 500ms         |
| PDF (10 pages)      | 5MB   | < 2s            |
| DOCX                | 1MB   | < 1s            |
| Text file           | 100KB | < 100ms         |
| URL fetch + process | -     | < 3s            |

## Edge Cases

### 1. Empty Document

```
Input: Empty file
Expected: riskScore: 0, riskLevel: "LOW"
```

### 2. No Matching Data

```
Input: Document with "John Doe", "john@example.com" (user is "Jane Smith")
Expected: All matchedData: false, riskScore: 0
```

### 3. Multiple Occurrences

```
Input: Document with user name appearing on pages 1, 3, 5
Expected: occurrences.name: [1, 3, 5]
```

### 4. Partial Matches

```
Input: "Tanashvi P." when user is "Tanashvi Pujari"
Expected: name: true
```

### 5. Case Insensitivity

```
Input: "TANASHVIPUJARI@GMAIL.COM" when user email is "tanashvipujari@gmail.com"
Expected: email: true
```

### 6. Multiple File Formats

```
Test: PDF → DOCX → TXT
Expected: All process successfully
```

## Debugging Tips

### Enable Verbose Logging

```javascript
// Modify documentScannerService.js
console.log("Extracted entities:", entities);
console.log("Matched data:", matches);
```

### Test Individual Modules

```javascript
const TextExtractor = require("./src/modules/textExtractor");
const EntityDetector = require("./src/modules/entityDetector");
const UserMatcher = require("./src/modules/userMatcher");

// Extract
const data = await TextExtractor.extractFromFile("./test.pdf");

// Detect
const entities = EntityDetector.detectEntities(data.text);

// Match
const matches = UserMatcher.matchEntities(entities, userProfile, data.text);
```

## Common Issues

### Issue: File type not supported

**Solution**: Ensure file is PDF, DOCX, or TXT. Check MIME type.

### Issue: Scan returns empty results

**Solution**: Check if user profile data is complete and properly formatted.

### Issue: Phone numbers not detected

**Solution**: Verify phone format matches supported patterns or add custom regex.

### Issue: Partial names not matching

**Solution**: Verify that first/last name components are in user profile.

## Success Criteria

✅ All sensitive data of logged-in user is detected
✅ Other people's data is properly ignored
✅ Risk scores are accurate and actionable
✅ Page-level tracking is accurate
✅ Processing time < 3 seconds for typical documents
✅ No security or privacy violations
✅ Graceful error handling
