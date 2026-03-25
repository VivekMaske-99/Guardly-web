import { Link, useLocation } from "react-router-dom";
import { FaHome, FaShieldAlt, FaChartBar, FaRobot } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Scan", path: "/scan", icon: <FaShieldAlt /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "Chatbot", path: "/chatbot", icon: <FaRobot /> },
  ];

  return (
    <div style={sidebar}>
      {/* LOGO */}
      <div style={logoContainer}>
        <span style={logoIcon}>🛡️</span>
        <span style={logoText}>GuardLY</span>
      </div>

      {/* NAV ITEMS */}
      <div style={navContainer}>
        {navItems.map((item, index) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              style={{
                ...navItem,
                ...(active ? activeItem : {}),
                
              }}
              onMouseEnter={(e) => {
  e.currentTarget.style.background = "rgba(100,200,255,0.1)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.background = "transparent";
}}
            >
              <span style={icon}>{item.icon}</span>
              <span>{item.name}</span>
              
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const sidebar = {
  width: "230px",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  background: "linear-gradient(180deg, #0a0e27, #020617)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "4px 0 30px rgba(0,0,0,0.4)",
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "40px",
};

const logoIcon = {
  fontSize: "28px",
  filter: "drop-shadow(0 0 10px rgba(100,200,255,0.6))",
};

const logoText = {
  fontSize: "20px",
  fontWeight: "700",
  background: "linear-gradient(135deg,#64c8ff,#9d7aff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const navContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const navItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 15px",
  borderRadius: "12px",
  color: "#cbd5f1",
  textDecoration: "none",
  transition: "all 0.3s ease",
  fontSize: "15px",
};

const activeItem = {
  background: "rgba(100,200,255,0.15)",
  color: "#64c8ff",
  boxShadow: "0 0 15px rgba(100,200,255,0.4)",
};

const icon = {
  fontSize: "16px",
};