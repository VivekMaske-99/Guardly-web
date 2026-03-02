import React, { useEffect, useRef } from 'react'
import './AnimatedBackground.css'
// Import background image from collage (optional - uncomment if you want to use it)
// import backgroundImage from '../assets/images/img.png'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    let connections = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    const createParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        })
      }
    }

    createParticles()

    // Draw circuit board pattern - more realistic
    const drawCircuitBoard = () => {
      const gridSize = 60
      const time = Date.now() * 0.0005
      
      // Base grid lines - more subtle
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.08)'
      ctx.lineWidth = 0.5

      // Horizontal lines with varying opacity
      for (let y = 0; y < canvas.height; y += gridSize) {
        const offset = Math.sin(time + y * 0.01) * 2
        ctx.globalAlpha = 0.3 + Math.sin(time + y * 0.005) * 0.2
        ctx.beginPath()
        ctx.moveTo(0, y + offset)
        ctx.lineTo(canvas.width, y + offset)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        const offset = Math.cos(time + x * 0.01) * 2
        ctx.globalAlpha = 0.3 + Math.cos(time + x * 0.005) * 0.2
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, canvas.height)
        ctx.stroke()
      }

      ctx.globalAlpha = 1

      // Circuit traces - diagonal and curved paths
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.15)'
      ctx.lineWidth = 1.5
      
      for (let i = 0; i < 20; i++) {
        const startX = (i * 150) % canvas.width
        const startY = (i * 120) % canvas.height
        const endX = startX + 100 + Math.sin(time + i) * 50
        const endY = startY + 80 + Math.cos(time + i) * 50
        
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.quadraticCurveTo(
          startX + 50, startY + 40,
          endX, endY
        )
        ctx.stroke()
      }

      // Circuit nodes with pulsing effect
      for (let y = 0; y < canvas.height; y += gridSize) {
        for (let x = 0; x < canvas.width; x += gridSize) {
          const pulse = Math.sin(time * 2 + x * 0.01 + y * 0.01) * 0.3 + 0.7
          const size = 1.5 + pulse * 1.5
          const opacity = 0.2 + pulse * 0.3
          
          ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
          
          // Glow effect
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3)
          glowGradient.addColorStop(0, `rgba(100, 200, 255, ${opacity * 0.5})`)
          glowGradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(x, y, size * 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Additional circuit paths
      ctx.strokeStyle = 'rgba(157, 122, 255, 0.12)'
      ctx.lineWidth = 1
      for (let i = 0; i < 15; i++) {
        const pathX = (i * 200) % canvas.width
        const pathY = (i * 180) % canvas.height
        const length = 150
        
        ctx.beginPath()
        ctx.moveTo(pathX, pathY)
        for (let j = 0; j < 5; j++) {
          const segX = pathX + (j * length / 5) + Math.sin(time + i + j) * 20
          const segY = pathY + Math.cos(time + i + j) * 15
          ctx.lineTo(segX, segY)
        }
        ctx.stroke()
      }
    }

    // Update and draw particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw circuit board
      drawCircuitBoard()

      // Update particles
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.fillStyle = `rgba(100, 200, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      connections = []
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      // Glowing orbs - more subtle and realistic
      const time = Date.now() * 0.001
      for (let i = 0; i < 4; i++) {
        const x = (Math.sin(time * 0.3 + i * 1.2) * 0.25 + 0.5) * canvas.width
        const y = (Math.cos(time * 0.4 + i * 0.8) * 0.25 + 0.5) * canvas.height
        const radius = 80 + Math.sin(time * 1.5 + i) * 25
        const opacity = 0.08 + Math.sin(time * 0.8 + i) * 0.04

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(157, 122, 255, ${opacity})`)
        gradient.addColorStop(0.5, `rgba(100, 200, 255, ${opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(157, 122, 255, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Additional blue glow orbs
      for (let i = 0; i < 3; i++) {
        const x = (Math.cos(time * 0.4 + i * 1.5) * 0.3 + 0.5) * canvas.width
        const y = (Math.sin(time * 0.5 + i * 1.0) * 0.3 + 0.5) * canvas.height
        const radius = 60 + Math.cos(time * 1.2 + i) * 20
        const opacity = 0.06 + Math.cos(time * 0.7 + i) * 0.03

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(100, 200, 255, ${opacity})`)
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="animated-background"
      />
      {/* Uncomment to use background image from collage */}
      {/* <div 
        className="background-image-overlay"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3 // Adjust opacity as needed
        }}
      /> */}
    </>
  )
}

export default AnimatedBackground
