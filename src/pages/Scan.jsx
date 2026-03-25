import React, { useState, useEffect } from "react";

const Scan = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= PARTICLES ================= */
  useEffect(() => {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    function animate() {
      ctx.fillStyle = "rgba(10,14,39,0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = "#667eea";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  /* ================= FILE SCAN ================= */
  const handleFileScan = async () => {
    try {
      if (!file) return alert("Select file");

      setLoading(true);
      setResult(null);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("document", file);

      const res = await fetch("http://localhost:5000/api/scan/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (data.error) {
        alert(data.error);
        return;
      }

      setResult(data.data || data);

    } catch (err) {
      console.error(err);
      alert("Scan failed");
    } finally {
      setLoading(false);
    }
  };
  const detectedCount = Object.values(result?.detected || {}).filter(
  (v) => v === 1
).length;

const getRecommendations = () => {
  const rec = [];

  if (result?.detected?.name)
    rec.push("Avoid exposing your full name publicly");

  if (result?.detected?.email)
    rec.push("Mask your email before sharing documents");

  if (result?.detected?.phone)
    rec.push("Remove or hide phone number");

  if (result?.detected?.location)
    rec.push("Avoid sharing location details");

  if (detectedCount >= 4)
    rec.push("High risk: multiple sensitive data detected");
  else if (detectedCount >= 2)
    rec.push("Medium risk: some personal data exposed");
  else rec.push("Low risk: minimal sensitive data");

  return rec.slice(0, 3);
};

const handleDownloadReport = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/report/ai-scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filePath: result.filePath,
        extractedValues: result.extractedValues,
        riskScore: result.riskScore,
        riskLevel: result.riskLevel,
      }),
    });

    // 🔥 IMPORTANT: read as blob NOT json
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "GuardLY_AI_Report.pdf";

    document.body.appendChild(a);
    a.click();
    a.remove();

  } catch (err) {
    console.error(err);
    alert("Download failed");
  }
};
const handleRedact = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/scan/redact/${result.scanId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 🔥 IMPORTANT FIX (NOT JSON)
  const blob = await res.blob();
const url = window.URL.createObjectURL(blob);

// 🔥 OPEN IN NEW TAB (FIXES ERROR)
window.open(url, "_blank");

const a = document.createElement("a");
a.href = url;
a.download = "redacted.pdf";
a.click();

    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err);
    alert("Redact failed");
  }
};


  return (
    <div style={wrapper}>
      <canvas id="particleCanvas" style={canvas}></canvas>

      {loading && (
        <div style={modal}>
          <h2>🛡️ Scanning...</h2>
        </div>
      )}

      <h1 style={title}>GuardLY Scanner</h1>

      {/* TOP GRID */}
      <div style={grid}>
        <div style={card}>
          <h2>📤 Upload Document</h2>

          <label style={uploadBox}>
            📁 Drag & drop document
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {file && <p>✓ {file.name}</p>}

          <button style={btn} onClick={handleFileScan}>
            ▶ Scan Document
          </button>
        </div>

        <div style={card}>
          <h2>🌐 Scan via URL</h2>

          <input
            style={input}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste URL..."
          />

          <button style={btn}>🔍 Scan URL</button>
        </div>
      </div>

      {/* 🔥 NEW RESULT UI */}
      {result && (
        <div style={reportContainer}>

          {/* LEFT */}
          <div style={leftPanel}>
  <div style={smallCard}>
    <p style={label}>RISK SCORE</p>
    <div style={circleWrapper}>
  <svg width="120" height="120">
    <circle
      cx="60"
      cy="60"
      r="50"
      stroke="#2e2e2e"
      strokeWidth="8"
      fill="none"
    />
    <circle
      cx="60"
      cy="60"
      r="50"
      stroke="#ef4444"
      strokeWidth="8"
      fill="none"
      strokeDasharray="314"
      strokeDashoffset={314 - (result?.riskScore / 100) * 314}
      strokeLinecap="round"
      transform="rotate(-90 60 60)"
    />
  </svg>

  <div style={circleText}>
    {result?.riskScore}
  </div>
</div>

    <p
      style={{
        color:
          result?.riskLevel === "HIGH"
            ? "#ff6b6b"
            : result?.riskLevel === "MEDIUM"
            ? "#facc15"
            : "#4ade80",
        fontWeight: "600",
      }}
    >
      {result?.riskLevel}
    </p>
  </div>

  <div style={smallCard}>
    <p style={label}>DATA DETECTED</p>

    <div style={dataGrid}>
      {["name", "email", "phone", "location"].map((key) => (
        <div
          key={key}
          style={{
            ...safeBox,
            background:
              result?.detected?.[key] === 1
                ? "rgba(255, 0, 0, 0.25)"   // 🔴 detected
                : "rgba(34, 197, 94, 0.2)", // 🟢 safe
            border:
              result?.detected?.[key] === 1
                ? "1px solid rgba(255,0,0,0.5)"
                : "1px solid rgba(34,197,94,0.4)",
          }}
        >
          <strong style={{ display: "block", marginBottom: "4px" }}>
            {key.toUpperCase()}
          </strong>

          {result?.detected?.[key] === 1 ? "Detected ⚠️" : "Safe ✔"}
        </div>
      ))}
    </div>
  </div>
</div>

          {/* RIGHT */}
         <div style={rightPanel}>
  <h2 style={reportTitle}>Privacy Risk Report</h2>

  {/* 🔥 DETECTED DATA GRID */}
  <div style={detectedGrid}>
    <div style={detectCard}>
      <p>👤 Name</p>
      <h4>{result?.extractedValues?.name || "Not Found"}</h4>
    </div>

    <div style={detectCard}>
      <p>📧 Email</p>
      <h4>{result?.extractedValues?.email || "Not Found"}</h4>
    </div>

    <div style={detectCard}>
      <p>📱 Phone</p>
      <h4>{result?.extractedValues?.phone || "Not Found"}</h4>
    </div>

    <div style={detectCard}>
      <p>📍 Location</p>
      <h4>{result?.extractedValues?.location || "Not Found"}</h4>
    </div>
  </div>

  {/* EXISTING CONTENT BELOW */}
  <div style={reportGrid}>
    <div style={infoCard}>
      <p>📊 Risk Level</p>
      <h2>{result?.riskLevel}</h2>
    </div>

    <div style={infoCard}>
      <p>📄 Pages Scanned</p>
      <h2>{result?.pageCount}</h2>
    </div>
  </div>

  <div style={findingBox}>
    <h3>💡 Key Findings</h3>
   <ul>
  {getRecommendations().map((r, i) => (
    <li key={i}>{r}</li>
  ))}
</ul>
  </div>

  <div style={btnRow}>
    <button style={actionBtn} onClick={handleDownloadReport}>
  📥 Download AI Report
</button>
  <button
  style={actionBtn}
  onClick={handleRedact}
  disabled={!result}
>
  🧹 Auto Redact
</button>

    
  </div>
</div>
        </div>
      )}
    </div>
  );
};

export default Scan;

const wrapper = {
  minHeight: "100vh",
  padding: "20px 40px 60px",
  color: "white",
  position: "relative",
};

const canvas = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
};

const title = {
  textAlign: "center",
  fontSize: "48px",
  marginBottom: "60px",
  background: "linear-gradient(135deg,#c7d2fe,#a78bfa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  maxWidth: "1100px",
  margin: "auto",
};

const card = {
  background: "rgba(20,33,61,0.6)",
  border: "1px solid rgba(102,126,234,0.25)",
  borderRadius: "22px",
  padding: "35px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const uploadBox = {
  border: "2px dashed rgba(102,126,234,0.4)",
  padding: "50px",
  borderRadius: "15px",
  textAlign: "center",
  cursor: "pointer",
};

const input = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid rgba(102,126,234,0.3)",
  background: "rgba(0,0,0,0.5)",
  color: "white",
};

const btn = {
  padding: "16px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg,#667eea,#764ba2)",
  color: "white",
  cursor: "pointer",
};

const modal = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

/* ================= REPORT CONTAINER ================= */

const reportContainer = {
  display: "grid",
  gridTemplateColumns: "300px 1fr",
  gap: "30px",
  width: "100%",
  maxWidth: "1100px",
  marginTop: "40px",
  alignItems: "stretch", // 🔥 fix height
};

/* ================= LEFT PANEL ================= */

const leftPanel = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  height: "100%",
};

const rightPanel = {
  background: "rgba(20,33,61,0.7)",
  padding: "30px",
  borderRadius: "20px",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(102,126,234,0.2)",
  width: "100%",
  height: "100%",
};

/* ================= SMALL CARD ================= */

const smallCard = {
  background: "rgba(20,33,61,0.6)",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid rgba(102,126,234,0.2)",
  width: "100%",
};

/* ================= REPORT TITLE ================= */

const reportTitle = {
  fontSize: "28px",
  marginBottom: "20px",
};

/* ================= REPORT GRID ================= */

const reportGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "20px",
};

/* ================= INFO CARD ================= */

const infoCard = {
  background: "rgba(20,33,61,0.6)",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid rgba(102,126,234,0.2)",
};

/* ================= FINDINGS ================= */

const findingBox = {
  background: "rgba(255,215,0,0.1)",
  border: "1px solid rgba(255,215,0,0.3)",
  padding: "20px",
  borderRadius: "16px",
  marginTop: "20px",
};

/* ================= BUTTON ROW ================= */

const btnRow = {
  display: "flex",
  gap: "12px",
  marginTop: "20px",
  flexWrap: "wrap",
};

/* ================= ACTION BUTTON ================= */

const actionBtn = {
  padding: "10px 16px",
  borderRadius: "10px",
  background: "transparent",
  border: "1px solid rgba(102,126,234,0.4)",
  color: "white",
  cursor: "pointer",
  transition: "0.3s",
};

/* ================= DATA GRID ================= */

const dataGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};

/* ================= SAFE BOX ================= */

const safeBox = {
  padding: "12px",
  borderRadius: "10px",
  textAlign: "center",
  fontSize: "14px",
  transition: "0.3s",
};

/* ================= LABEL ================= */

const label = {
  color: "#a78bfa",
  fontSize: "13px",
  marginBottom: "8px",
};

/* 🔥 DETECTED GRID */

const detectedGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginBottom: "20px",
};

/* 🔥 DETECT CARD */

const detectCard = {
  background: "rgba(20,33,61,0.6)",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid rgba(102,126,234,0.2)",
  minHeight: "70px",
};

const circleWrapper = {
  position: "relative",
  width: "120px",
  height: "120px",
  margin: "10px auto",
};

const circleText = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "20px",
  fontWeight: "bold",
};