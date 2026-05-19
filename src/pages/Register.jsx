import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.message) {
        alert(data.message);
        navigate("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapper}>
      {/* LEFT SIDE */}
      <div style={left}>
        <div style={leftContent}>
          <h1 style={title}>GuardLY</h1>
          <p style={subtitle}>Join the Security Community</p>
          <p style={description}>Start protecting your data with advanced AI-powered security</p>
          <div style={illustration}>🔐</div>
          <div style={features}>
            <div style={feature}>✓ Easy Setup</div>
            <div style={feature}>✓ Instant Protection</div>
            <div style={feature}>✓ Zero Hidden Costs</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={right}>
        <div style={card}>
          <div style={cardHeader}>
            <h2 style={cardTitle}>Create Account</h2>
            <p style={cardSubtitle}>Get started in seconds</p>
          </div>

          {error && <div style={errorMessage}>{error}</div>}

          <form onSubmit={handleRegister}>
            <div style={formGroup}>
              <label style={label}>Full Name</label>
              <input
                style={input}
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={formGroup}>
              <label style={label}>Email Address</label>
              <input
                style={input}
                type="email"
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
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={formGroup}>
              <label style={label}>Confirm Password</label>
              <input
                style={input}
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button 
              style={{...btn, opacity: loading ? 0.7 : 1}} 
              disabled={loading}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')} 
              onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div style={divider}>
            <span>Already have an account?</span>
          </div>

          <p style={registerLink}>
            <span
              style={registerSpan}
              onClick={() => navigate("/login")}
            >
              Sign In Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

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
  marginBottom: "35px",
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
  marginBottom: "22px",
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

const errorMessage = {
  padding: "12px 16px",
  marginBottom: "20px",
  borderRadius: "10px",
  background: "rgba(255, 107, 107, 0.15)",
  border: "1px solid rgba(255, 107, 107, 0.3)",
  color: "#ff8787",
  fontSize: "13px",
  fontWeight: "500",
};

const divider = {
  textAlign: "center",
  margin: "28px 0 18px",
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