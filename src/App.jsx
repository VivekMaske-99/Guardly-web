import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Chatbot from "./components/Chatbot";
import Contact from "./components/Contact";
import AnimatedBackground from "./components/AnimatedBackground";
import Scan from "./pages/Scan";
import "./App.css";

function Home() {
  // original single-page layout
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
