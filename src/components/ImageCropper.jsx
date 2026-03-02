import React, { useState } from 'react'
import './ImageCropper.css'

/**
 * Image Cropper Tool
 * Use this component to visually identify crop coordinates from your collage
 * Open this in your browser to help you find the exact coordinates
 */
const ImageCropper = () => {
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isSelecting, setIsSelecting] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setStartPos({ x, y })
    setIsSelecting(true)
    setCropArea({ x, y, width: 0, height: 0 })
  }

  const handleMouseMove = (e) => {
    if (!isSelecting) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setCropArea({
      x: Math.min(startPos.x, x),
      y: Math.min(startPos.y, y),
      width: Math.abs(x - startPos.x),
      height: Math.abs(y - startPos.y)
    })
  }

  const handleMouseUp = () => {
    setIsSelecting(false)
    console.log('Crop coordinates:', cropArea)
    console.log(`CSS: clip-path: inset(${cropArea.y}px ${cropArea.x + cropArea.width}px ${cropArea.y + cropArea.height}px ${cropArea.x}px)`)
    console.log(`Or use: backgroundPosition: '${-cropArea.x}px ${-cropArea.y}px'`)
  }

  return (
    <div className="image-cropper-tool">
      <h2>Image Cropper Tool</h2>
      <p>Click and drag to select an area. Check console for coordinates.</p>
      <div 
        className="image-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
          src="/src/assets/images/img.png" 
          alt="Collage" 
          className="collage-image"
        />
        {isSelecting && (
          <div 
            className="crop-overlay"
            style={{
              left: cropArea.x,
              top: cropArea.y,
              width: cropArea.width,
              height: cropArea.height
            }}
          />
        )}
      </div>
      <div className="crop-info">
        <p>X: {cropArea.x}px, Y: {cropArea.y}px</p>
        <p>Width: {cropArea.width}px, Height: {cropArea.height}px</p>
      </div>
    </div>
  )
}

export default ImageCropper
