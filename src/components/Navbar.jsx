import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, getToken, logout } from "../utils/auth";

import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ UPDATE USER ON ROUTE CHANGE
  useEffect(() => {
    const userData = getUser();
    setUser(userData);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // ✅ LOGOUT
  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">GuardLY</span>
        </Link>

        {/* NAV LINKS */}
        <ul className="nav-links">

          <li>
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/scan"
              className={`nav-link ${location.pathname === "/scan" ? "active" : ""}`}
            >
              Scan
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/chatbot"
              className={`nav-link ${location.pathname === "/chatbot" ? "active" : ""}`}
            >
              Chatbot
            </Link>
          </li>

        </ul>

        {/* AUTH */}
        <div className="nav-auth">

          {getToken() ? (
            <>
              {/* ✅ FIXED: SHOW NAME ONLY */}
              <span className="user-name">
                👤 {user?.name || "User"}
              </span>

              <motion.button
                className="btn-signout"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login">
                <motion.button
                  className="btn-signin"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </Link>

              <Link to="/register">
                <motion.button
                  className="btn-signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </Link>
            </>
          )}

        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;