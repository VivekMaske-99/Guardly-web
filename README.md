# GuardDLY - AI-Powered Cybersecurity Platform

A modern, animated React web application for GuardDLY, featuring AI-powered cybersecurity solutions with a futuristic dark theme and interactive animations.

## Features

- 🎨 **Animated Background**: Live, moving circuit board patterns with particle effects
- 🛡️ **Interactive Components**: Animated AI heads, shields, and visual elements
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎭 **Smooth Animations**: Powered by Framer Motion for fluid interactions
- 🌐 **Modern UI/UX**: Dark theme with glowing blue/purple accents

## Sections

1. **Hero Section**: Main landing area with headline, CTA buttons, and animated AI head
2. **About GuardDLY**: Information about the platform with animated shield visualization
3. **Cybersecurity Services**: Three service cards with animated illustrations
4. **AI Privacy Assistant**: Interactive chatbot interface with animated AI head
5. **Contact**: Contact form for user inquiries

## Navigation

The navbar includes:

- Home
- Scan
- Chatbot
- Contact
- Sign In
- Sign Up

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

_If you're using the document scanning feature make sure the backend is
running as well. The easiest way during development is to use the
helper script below._

3. You can also run both frontend and backend concurrently:

```bash
npm run dev:all
```

4. Open your browser and navigate to `http://localhost:3000`

Once the application is built (`npm run build`) you can serve everything
from a single Express process with:

```bash
npm start
```

This will launch the React app on `/` and make the scanner UI+API
available under `/doc-scan`.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Framer Motion**: Animation library
- **CSS3**: Styling with modern features

## Project Structure

```
frontend-G/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Contact.jsx
│   │   └── AnimatedBackground.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

- Colors can be adjusted in the CSS files (look for hex colors like `#64c8ff`, `#9d7aff`, `#7ef9a3`)
- Animation speeds can be modified in component files (duration values in Framer Motion)
- Background patterns can be customized in `AnimatedBackground.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.
