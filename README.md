# 🛡️ GuardLY – AI Privacy Risk Analyzer

> An AI-powered privacy analysis platform that helps users identify privacy risks in documents and text by providing actionable insights, risk scores, and recommendations.

![GuardLY Banner](./docs/screenshots/banner.png)

<p align="center">

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)

</p>

---

## 🔗 Live Demo

🌐 https://guardly-web.vercel.app

## 💻 Source Code

📂 https://github.com/YOUR_USERNAME/guardly

---

# 📖 Overview

GuardLY is a full-stack web application that analyzes user-uploaded content for privacy risks using AI. The platform scans text or documents, detects sensitive information, generates a privacy risk score, and provides recommendations to help users protect their personal data.

The application features secure authentication, interactive dashboards, activity history, and AI-powered privacy analysis in an intuitive and responsive interface.

---

# ✨ Features

- 🔐 Secure JWT Authentication
- 📄 Document Privacy Analysis
- 🤖 AI-powered Risk Detection
- 📊 Privacy Score Dashboard
- 🚨 Risk Alerts & Recommendations
- 📂 Scan History
- 👤 User Dashboard
- 📱 Fully Responsive UI
- 🔒 Protected Routes
- ⚡ Fast and Modern User Experience

---

# 🛠 Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- REST APIs

## Database

- MongoDB

## AI Integration

- Groq Cloud API
- LLaMA Model

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```
GuardLY
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── hooks
│   └── services
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── config
│   └── utils
│
└── README.md
```

---

# 🏗 Architecture

```
              React Frontend
                     │
                     ▼
             Express REST API
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
   MongoDB Database         Groq AI API
```

---

# 📸 Screenshots

### Home Page

![Home](docs/screenshots/home.png)

---

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

---

### Privacy Report

![Report](docs/screenshots/report.png)

---

### Scan History

![History](docs/screenshots/history.png)

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/guardly.git
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

GROQ_API_KEY=your_api_key
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Scan

```
POST /api/scan
```

## History

```
GET /api/history
```

---

# 🚀 Future Improvements

- Docker Support
- AWS Deployment
- OCR Document Scanning
- Multi-language Analysis
- Team Workspaces
- Email Notifications
- PDF Report Export

---

# 👨‍💻 Author

**Vivek Maske**

📧 vivekmaske998@gmail.com

🔗 LinkedIn

https://linkedin.com/in/vivekmaske99

💻 GitHub

https://github.com/VivekMaske-99

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.

---

# 📜 License

This project is licensed under the MIT License.
