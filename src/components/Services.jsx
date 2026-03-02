import React from 'react'
import { motion } from 'framer-motion'
import './Services.css'
// Import the collage image
import collageImage from '../assets/images/img.png'

const Services = () => {
  const services = [
    {
      title: 'AI Security Scan',
      description: 'Leverage advanced artificial intelligence to scan and analyze your digital assets for potential vulnerabilities and threats. Our AI-powered scanning technology provides comprehensive security assessments in real-time.',
      imageAlt: 'AI Security Scan',
      // Adjust backgroundPosition to crop this image from collage
      backgroundPosition: '0% 50%' // Change these percentages based on your collage layout
    },
    {
      title: 'Real-Time Threat Defense',
      description: 'Stay protected with our cutting-edge real-time threat detection and defense system. Monitor your network, applications, and data continuously to identify and neutralize threats before they cause damage.',
      imageAlt: 'Real-Time Threat Defense',
      backgroundPosition: '33% 50%' // Change these percentages
    },
    {
      title: 'Privacy & Compliance',
      description: 'Ensure your organization meets all regulatory requirements with our comprehensive privacy and compliance solutions. Get automated compliance checks and detailed reporting for GDPR, HIPAA, and more.',
      imageAlt: 'Privacy & Compliance',
      backgroundPosition: '66% 50%' // Change these percentages
    }
  ]

  return (
    <section id="scan" className="services">
      <motion.h2
        className="services-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Our Cybersecurity Services
      </motion.h2>

      <div className="services-container">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <motion.div
              className="service-image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="service-image-img"
                style={{
                  backgroundImage: `url(${collageImage})`,
                  backgroundPosition: service.backgroundPosition || 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
                aria-label={service.imageAlt}
              />
            </motion.div>

            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-description">{service.description}</p>
            
            <motion.button
              className="service-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(126, 249, 163, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Services
