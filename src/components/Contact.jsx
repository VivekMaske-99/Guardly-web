import React from "react";
import { motion } from "framer-motion";
import "./Contact.css";
import robo2Image from "../assets/images/robo2.png";

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img src={robo2Image} alt="robot" className="contact-robot" />
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Have questions? Reach out to us and we'll get back to you shortly.
        </p>

        <div className="contact-grid">
          <motion.form
            className="contact-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.input
              type="text"
              placeholder="Your Name"
              className="form-input"
              whileFocus={{ scale: 1.02, borderColor: "#64c8ff" }}
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              className="form-input"
              whileFocus={{ scale: 1.02, borderColor: "#64c8ff" }}
            />
            <motion.input
              type="text"
              placeholder="Subject"
              className="form-input"
              whileFocus={{ scale: 1.02, borderColor: "#64c8ff" }}
            />
            <motion.button
              type="submit"
              className="form-submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(126, 249, 163, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>

          <div className="contact-info">
            <div className="info-item">
              <strong>Contact Us</strong>
            </div>
            <div className="info-item">
              <span className="icon">📧</span>
              <span>support@guarddly.com</span>
            </div>
            <div className="info-item">
              <span className="icon">📞</span>
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="info-item">
              <span className="icon">📍</span>
              <span>1234 Security Blvd, Cyber City, CA 90210</span>
            </div>
            <div className="info-item social">
              <a href="#" className="social-icon">
                🐦
              </a>
              <a href="#" className="social-icon">
                🔗
              </a>
              <a href="#" className="social-icon">
                📘
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
