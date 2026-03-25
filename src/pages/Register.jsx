import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    alert(data.message);
    window.location.href = "/login";
  };

  return (
    <div style={wrapper}>
      
      <div style={left}>
        <h1 style={title}>GuardLY</h1>
        <p style={subtitle}>Secure Your Data</p>

        <div style={illustration}>
          🔐
        </div>
      </div>

      <div style={right}>
        <div style={card}>
          <h2 style={{ marginBottom: "20px" }}>Register</h2>

          <input
            style={input}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={btn} onClick={handleRegister}>
            Register
          </button>

          <p style={{ marginTop: "15px" }}>
            Already have account? <a href="/login">Login</a>
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