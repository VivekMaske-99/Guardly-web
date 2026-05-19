import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ✅ If already logged in → redirect
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("🔥 LOGIN RESPONSE:", data);

      if (data.token) {
        // ✅ STORE TOKEN
        localStorage.setItem("token", data.token);

        // ✅ STORE FULL USER OBJECT (FIXED)
        const userObj = data.user || {
          _id: data.userId,
          name: data.name,
          email: data.email,
        };

        console.log("🔥 SAVING USER:", userObj);

        localStorage.setItem("user", JSON.stringify(userObj));

        // ✅ REDIRECT
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };

  return (
    <div style={wrapper}>
      {/* LEFT SIDE */}
      <div style={left}>
        <div style={leftContent}>
          <h1 style={title}>GuardLY</h1>
          <p style={subtitle}>AI-Powered Cybersecurity</p>
          <p style={description}>Protect your digital assets with advanced threat detection</p>
          <div style={illustration}>🛡️</div>
          <div style={features}>
            <div style={feature}>✓ Real-time Protection</div>
            <div style={feature}>✓ AI-Powered Detection</div>
            <div style={feature}>✓ 24/7 Monitoring</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={right}>
        <div style={card}>
          <div style={cardHeader}>
            <h2 style={cardTitle}>Welcome Back</h2>
            <p style={cardSubtitle}>Sign in to your account</p>
          </div>

          <div style={formGroup}>
            <label style={label}>Email Address</label>
            <input
              style={input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Password</label>
            <input
              style={input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button style={btn} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} 
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'} 
                  onClick={handleLogin}>
            Sign In
          </button>

          <div style={divider}>
            <span>Don't have an account?</span>
          </div>

          <p style={registerLink}>
            <span
              style={registerSpan}
              onClick={() => navigate("/register")}
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

/* ================= STYLES ================= */

const wrapper = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #020617 100%)",
  color: "white",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const left = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(10, 14, 39, 0.6)",
  borderRight: "1px solid rgba(100, 200, 255, 0.1)",
};

const leftContent = {
  textAlign: "center",
  maxWidth: "400px",
};

const right = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
};

const card = {
  background: "rgba(20, 33, 61, 0.4)",
  padding: "50px",
  borderRadius: "20px",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(100, 200, 255, 0.2)",
  width: "100%",
  maxWidth: "380px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(100, 200, 255, 0.1)",
};

const cardHeader = {
  marginBottom: "40px",
};

const cardTitle = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "10px",
  background: "linear-gradient(135deg, #64c8ff, #9d7aff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const cardSubtitle = {
  fontSize: "14px",
  opacity: 0.7,
  color: "#b0b0b0",
};

const formGroup = {
  marginBottom: "24px",
};

const label = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  marginBottom: "8px",
  color: "#64c8ff",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const input = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: "0",
  borderRadius: "12px",
  border: "1.5px solid rgba(100, 200, 255, 0.2)",
  background: "rgba(10, 14, 39, 0.6)",
  color: "white",
  fontSize: "14px",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const btn = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #64c8ff, #9d7aff)",
  color: "white",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "15px",
  transition: "all 0.3s ease",
  boxShadow: "0 8px 25px rgba(100, 200, 255, 0.3)",
  marginTop: "10px",
};

const divider = {
  textAlign: "center",
  margin: "30px 0 20px",
  fontSize: "13px",
  opacity: 0.6,
};

const registerLink = {
  textAlign: "center",
  fontSize: "14px",
  margin: "0",
};

const registerSpan = {
  color: "#64c8ff",
  cursor: "pointer",
  fontWeight: "700",
  transition: "all 0.3s ease",
};

const title = {
  fontSize: "48px",
  fontWeight: "800",
  background: "linear-gradient(135deg, #64c8ff, #9d7aff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: "0 0 10px 0",
};

const subtitle = {
  fontSize: "18px",
  fontWeight: "600",
  opacity: 0.9,
  marginBottom: "5px",
  color: "#64c8ff",
};

const description = {
  fontSize: "14px",
  opacity: 0.7,
  marginBottom: "40px",
  maxWidth: "300px",
  margin: "0 auto 40px",
  lineHeight: "1.6",
};

const illustration = {
  fontSize: "100px",
  marginBottom: "30px",
  display: "inline-block",
  filter: "drop-shadow(0 0 20px rgba(100, 200, 255, 0.4))",
};

const features = {
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const feature = {
  fontSize: "14px",
  color: "#b0b0b0",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "500",
};