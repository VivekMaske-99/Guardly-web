# Image Crop Guide

Your collage image (`img.png`) is now being used throughout the application. Here's how to adjust the crop positions:

## Quick Start - Visual Test Page

I've created a visual test page to help you adjust crop positions easily:

1. **Temporarily add the test page to your App.jsx:**
```jsx
import ImageTest from './pages/ImageTest'

// In your App component, replace the return with:
function App() {
  // Change this to false when done testing
  const showTestPage = true
  
  if (showTestPage) {
    return <ImageTest />
  }
  
  return (
    <div className="app">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Chatbot />
      <Contact />
    </div>
  )
}
```

2. **Run your app** and use the sliders to adjust each image position
3. **Copy the `backgroundPosition` values** from the code snippets shown
4. **Update the components** with the correct values
5. **Set `showTestPage = false`** when done

## How to Adjust Crop Positions

### Method 1: Visual Tool (Recommended)
1. Temporarily add the ImageCropper component to your App.jsx:
```jsx
import ImageCropper from './components/ImageCropper'

// In your App component, add:
<ImageCropper />
```

2. Open your browser and use the tool to click and drag on your collage image
3. Check the browser console for the exact coordinates
4. Update the `backgroundPosition` values in the components

### Method 2: Manual Adjustment

Edit the `backgroundPosition` values in these files:

#### Hero Component (`src/components/Hero.jsx`)
- **UI Element**: Line ~45, change `backgroundPosition: '0% 0%'`
- **AI Head**: Line ~65, change `backgroundPosition: '20% 10%'`
- **Shield**: Line ~95, change `backgroundPosition: '70% 10%'`

#### Services Component (`src/components/Services.jsx`)
- **Security Scan**: Line ~12, change `backgroundPosition: '0% 50%'`
- **Threat Defense**: Line ~18, change `backgroundPosition: '33% 50%'`
- **Privacy Compliance**: Line ~24, change `backgroundPosition: '66% 50%'`

## Understanding backgroundPosition

The `backgroundPosition` uses percentages:
- `'0% 0%'` = top-left corner
- `'50% 50%'` = center
- `'100% 100%'` = bottom-right corner

You can also use pixel values:
- `'200px 100px'` = 200px from left, 100px from top

## Background Image

To use the background from your collage:
1. Open `src/components/AnimatedBackground.jsx`
2. Uncomment the import and the background overlay div
3. Adjust the `backgroundPosition` to show the background section
4. Adjust `opacity` to control how visible it is (0.0 to 1.0)

## Quick Tips

- Use browser DevTools to inspect elements and see the current background position
- You can use `backgroundSize: '200%'` to zoom in/out on specific areas
- Test different positions until the images align perfectly

## Example Layout

If your collage is arranged like this:
```
[AI Head] [Shield] [UI Element]
[Security] [Threat] [Privacy]
```

You might use:
- AI Head: `backgroundPosition: '0% 0%'`
- Shield: `backgroundPosition: '50% 0%'`
- UI Element: `backgroundPosition: '75% 0%'`
- Security: `backgroundPosition: '0% 50%'`
- Threat: `backgroundPosition: '33% 50%'`
- Privacy: `backgroundPosition: '66% 50%'`

Adjust based on your actual collage layout!
