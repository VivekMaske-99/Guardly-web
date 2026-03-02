import React from 'react'
import { motion } from 'framer-motion'
import './About.css'
// Import the guard/shield image
import guardImage from '../assets/images/guard.png'

const About = () => {
  const stats = [
    { number: '500K+', label: 'Users Protected' },
    { number: '1.2M+', label: 'Threats Prevented' },
    { number: '24/7', label: '' }
  ]

  return (
    <section className="about">
      <div className="about-container">
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="shield-large">
            <img 
              src={guardImage} 
              alt="Guard Shield" 
              className="shield-img"
            />
          </div>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-label-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="about-label">About GuardDLY</h2>
          </motion.div>
          
          <motion.div
            className="about-title-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="about-title">Advanced Cybersecurity</h3>
            <h3 className="about-title-subtitle">Powered by AI</h3>
          </motion.div>
          
          <motion.p
            className="about-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            GuardDLY is a cybersecurity platform powering top-notch digital protection for keeping your digital life secure. Our AI-powered solutions provide real-time threat detection, comprehensive security scanning, and 24/7 monitoring to ensure your online presence remains protected.
          </motion.p>

          <motion.div
            className="about-stats-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="about-stats-box">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="about-stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="about-stat-number">{stat.number}</div>
                  {stat.label && <div className="about-stat-label">{stat.label}</div>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button
            className="btn-explore"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(126, 249, 163, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our AI Security
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default About
