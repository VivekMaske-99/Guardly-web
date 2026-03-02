import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// framer-motion offers a factory for animating custom components
const MotionLink = motion(Link);
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">GuardDLY</span>
        </motion.div>

        <ul className="nav-links">
          <li>
            <motion.a
              href="#home"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.a>
          </li>
          <li>
            {/* use plain Link here to rule out motion issues */}
            <Link
              to="/scan"
              className="nav-link"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Scan
            </Link>
          </li>
          <li>
            <motion.a
              href="#chatbot"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Chatbot
            </motion.a>
          </li>
          <li>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.a>
          </li>
        </ul>

        <div className="nav-auth">
          <motion.button
            className="btn-signin"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
          <motion.button
            className="btn-signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
