/**
 * Image Crop Utility
 * This file helps extract specific parts from the collage image
 * You can adjust the coordinates based on your image layout
 */

export const imageCrops = {
  // Hero Section Images
  aiHead: {
    src: '/src/assets/images/img.png',
    // Adjust these values based on your collage layout
    // Format: [x, y, width, height] in pixels
    crop: '0px 0px 450px 450px', // Example: top-left, 450x450
    backgroundSize: 'cover',
    backgroundPosition: '0% 0%'
  },
  shield: {
    src: '/src/assets/images/img.png',
    crop: '450px 0px 200px 240px', // Example: right of AI head
    backgroundSize: 'cover',
    backgroundPosition: '0% 0%'
  },
  uiElement: {
    src: '/src/assets/images/img.png',
    crop: '0px 450px 120px 100px', // Example: below AI head
    backgroundSize: 'cover',
    backgroundPosition: '0% 0%'
  },
  // Services Section Images
  securityScan: {
    src: '/src/assets/images/img.png',
    crop: '650px 0px 600px 400px', // Adjust based on your layout
    backgroundSize: 'cover',
    backgroundPosition: '0% 0%'
  },
  threatDefense: {
    src: '/src/assets/images/img.png',
    crop: '650px 400px 600px 400px',
    backgroundSize: 'cover',
    backgroundPosition: '0% 0%'
  },
  privacyCompliance: {
    src: '/src/assets/images/img.png',
    crop: '650px 800px 600px 400px',
    backgroundSize: 'cover',
    backgroundPosition: '0% 0%'
  },
  // Background Image
  background: {
    src: '/src/assets/images/img.png',
    crop: '0px 0px 100% 100%', // Full image or specific section
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}

/**
 * Helper function to get CSS for cropped image
 */
export const getCroppedImageStyle = (cropConfig) => {
  return {
    backgroundImage: `url(${cropConfig.src})`,
    backgroundSize: cropConfig.backgroundSize || 'cover',
    backgroundPosition: cropConfig.backgroundPosition || 'center',
    backgroundRepeat: 'no-repeat',
    // Use clip-path for precise cropping
    clipPath: `inset(${cropConfig.crop})`,
    // Or use object-fit with a wrapper div
  }
}
