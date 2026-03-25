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
      const res = await fetch("http://localhost:5000/api/auth/login", {
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
        <h1 style={title}>GuardLY</h1>
        <p style={subtitle}>AI Cybersecurity Protection</p>
        <div style={illustration}>🛡️</div>
      </div>

      {/* RIGHT SIDE */}
      <div style={right}>
        <div style={card}>
          <h2 style={{ marginBottom: "20px" }}>Login</h2>

          <input
            style={input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={btn} onClick={handleLogin}>
            Login
          </button>

          <p style={{ marginTop: "15px" }}>
            New user?{" "}
            <span
              style={{ color: "#64c8ff", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
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
  background: "linear-gradient(135deg,#0a0e27,#020617)",
  color: "white",
};

const left = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(20,33,61,0.5)",
};

const right = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "rgba(20,33,61,0.5)",
  padding: "40px",
  borderRadius: "20px",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(102,126,234,0.3)",
  width: "300px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid rgba(102,126,234,0.3)",
  background: "rgba(0,0,0,0.5)",
  color: "white",
};

const btn = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg,#667eea,#764ba2)",
  color: "white",
  cursor: "pointer",
};

const title = {
  fontSize: "40px",
  background: "linear-gradient(135deg,#64c8ff,#9d7aff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitle = {
  opacity: 0.7,
};

const illustration = {
  fontSize: "80px",
  marginTop: "20px",
};