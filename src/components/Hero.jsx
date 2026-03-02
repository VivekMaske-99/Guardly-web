import React from 'react'
import { motion } from 'framer-motion'
import './Hero.css'
// Import the robot image
import robotImage from '../assets/images/robot.png'

const Hero = () => {
  const stats = [
    { number: '1,500+', label: 'Websites Scanned' },
    { number: '15m+', label: 'Threats Detected' },
    { number: '99.9%', label: 'Detection Accuracy' }
  ]

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        {/* Left Section - Text Content */}
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Cybersecurity Made Simple and Secure
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Protect your digital life with AI-powered security and privacy solutions.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-box"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Section - Visuals */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* AI Head - Central Visual - Large and Prominent */}
          <div className="ai-head-container">
            <div className="ai-head">
              <img 
                src={robotImage} 
                alt="AI Robot" 
                className="ai-head-img"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
