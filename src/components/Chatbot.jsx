import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Chatbot.css";
import robo2Image from "../assets/images/robo2.png";

const Chatbot = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const scrollToInterface = () => {
    document
      .querySelector(".chatbot-interface-container")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const options = [
    "Scan my website for threats",
    "Improve my online privacy",
    "How to secure my Wi-Fi?",
  ];

  return (
    <section id="chatbot" className="chatbot">
      <div className="chatbot-container">
        {/* glass card background */}
        <div className="chatbot-card">
          <div className="chatbot-header">
            <motion.h2
              className="chatbot-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Your AI Privacy Assistant
            </motion.h2>
            <motion.p
              className="chatbot-subtitle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Chat with GuardDLY's AI chatbot for instant security and{" "}
              <strong>privacy guidance</strong>.
            </motion.p>
          </div>

          <motion.div
            className="chatbot-interface-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="chatbot-interface">
              <div className="chat-interface-left">
                <div className="chat-bubbles">
                  <div className="bot-bubble">
                    How can I assist you today?
                    <span className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                  {selectedOption !== null && (
                    <motion.div
                      className="user-bubble"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {options[selectedOption]}
                    </motion.div>
                  )}
                </div>

                <div className="options-and-button">
                  <div className="chat-options">
                    {options.map((option, index) => (
                      <motion.button
                        key={index}
                        className={`chat-option ${
                          selectedOption === index ? "selected" : ""
                        }`}
                        onClick={() => setSelectedOption(index)}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span
                          className={`option-dot ${
                            index % 2 === 0 ? "blue" : "green"
                          }`}
                        />
                        {option}
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    className="use-chatbot-btn"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(100,200,255,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToInterface}
                  >
                    Use Chatbot
                  </motion.button>
                </div>
              </div>

              <div className="chatbot-visual">
                {/* ambient aura and subtle particles behind robot */}
                <div className="particles">
                  <span className="particle"></span>
                  <span className="particle"></span>
                  <span className="particle"></span>
                  <span className="particle"></span>
                  <span className="particle"></span>
                  <span className="particle"></span>
                </div>

                <img
                  src={robo2Image}
                  alt="AI Assistant"
                  className="robo2-img"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
