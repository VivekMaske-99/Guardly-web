import React, { useState } from 'react'
import collageImage from '../assets/images/img.png'
import './ImageTest.css'

/**
 * Image Test Page
 * Use this page to visually adjust crop positions
 * Add this route temporarily to test: <Route path="/test" element={<ImageTest />} />
 */
const ImageTest = () => {
  const [crops, setCrops] = useState({
    aiHead: { x: 20, y: 10 },
    shield: { x: 70, y: 10 },
    uiElement: { x: 0, y: 0 },
    securityScan: { x: 0, y: 50 },
    threatDefense: { x: 33, y: 50 },
    privacyCompliance: { x: 66, y: 50 }
  })

  const updateCrop = (key, axis, value) => {
    setCrops(prev => ({
      ...prev,
      [key]: { ...prev[key], [axis]: parseFloat(value) || 0 }
    }))
  }

  return (
    <div className="image-test-page">
      <h1>Image Crop Position Tester</h1>
      <p>Adjust the sliders to position each image from your collage</p>
      
      <div className="test-container">
        {/* Full Collage Preview */}
        <div className="collage-preview">
          <h2>Full Collage</h2>
          <img src={collageImage} alt="Collage" className="full-collage" />
        </div>

        {/* Individual Crops */}
        <div className="crops-section">
          <h2>Cropped Sections</h2>
          
          {/* Hero Section */}
          <div className="crop-group">
            <h3>Hero Section</h3>
            
            <div className="crop-item">
              <label>AI Head</label>
              <div className="controls">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={crops.aiHead.x}
                  onChange={(e) => updateCrop('aiHead', 'x', e.target.value)}
                />
                <span>X: {crops.aiHead.x}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={crops.aiHead.y}
                  onChange={(e) => updateCrop('aiHead', 'y', e.target.value)}
                />
                <span>Y: {crops.aiHead.y}%</span>
              </div>
              <div 
                className="crop-preview"
                style={{
                  backgroundImage: `url(${collageImage})`,
                  backgroundPosition: `${crops.aiHead.x}% ${crops.aiHead.y}%`,
                  backgroundSize: 'cover'
                }}
              />
              <code>backgroundPosition: '{crops.aiHead.x}% {crops.aiHead.y}%'</code>
            </div>

            <div className="crop-item">
              <label>Shield</label>
              <div className="controls">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={crops.shield.x}
                  onChange={(e) => updateCrop('shield', 'x', e.target.value)}
                />
                <span>X: {crops.shield.x}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={crops.shield.y}
                  onChange={(e) => updateCrop('shield', 'y', e.target.value)}
                />
                <span>Y: {crops.shield.y}%</span>
              </div>
              <div 
                className="crop-preview"
                style={{
                  backgroundImage: `url(${collageImage})`,
                  backgroundPosition: `${crops.shield.x}% ${crops.shield.y}%`,
                  backgroundSize: 'cover'
                }}
              />
              <code>backgroundPosition: '{crops.shield.x}% {crops.shield.y}%'</code>
            </div>

            <div className="crop-item">
              <label>UI Element</label>
              <div className="controls">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={crops.uiElement.x}
                  onChange={(e) => updateCrop('uiElement', 'x', e.target.value)}
                />
                <span>X: {crops.uiElement.x}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={crops.uiElement.y}
                  onChange={(e) => updateCrop('uiElement', 'y', e.target.value)}
                />
                <span>Y: {crops.uiElement.y}%</span>
              </div>
              <div 
                className="crop-preview small"
                style={{
                  backgroundImage: `url(${collageImage})`,
                  backgroundPosition: `${crops.uiElement.x}% ${crops.uiElement.y}%`,
                  backgroundSize: 'cover'
                }}
              />
              <code>backgroundPosition: '{crops.uiElement.x}% {crops.uiElement.y}%'</code>
            </div>
          </div>

          {/* Services Section */}
          <div className="crop-group">
            <h3>Services Section</h3>
            
            {['securityScan', 'threatDefense', 'privacyCompliance'].map((key) => (
              <div key={key} className="crop-item">
                <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                <div className="controls">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={crops[key].x}
                    onChange={(e) => updateCrop(key, 'x', e.target.value)}
                  />
                  <span>X: {crops[key].x}%</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={crops[key].y}
                    onChange={(e) => updateCrop(key, 'y', e.target.value)}
                  />
                  <span>Y: {crops[key].y}%</span>
                </div>
                <div 
                  className="crop-preview"
                  style={{
                    backgroundImage: `url(${collageImage})`,
                    backgroundPosition: `${crops[key].x}% ${crops[key].y}%`,
                    backgroundSize: 'cover'
                  }}
                />
                <code>backgroundPosition: '{crops[key].x}% {crops[key].y}%'</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageTest
