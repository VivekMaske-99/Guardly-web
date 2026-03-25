import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Chatbot from "./components/Chatbot";
import Contact from "./components/Contact";
import AnimatedBackground from "./components/AnimatedBackground";

import Scan from "./pages/Scan";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

// 🏠 Home Page
function Home() {
  return (
    <>
      <AnimatedBackground />
      <Hero />
      <About />
      <Services />
      <Chatbot />
      <Contact />
    </>
  );
}

// 🔥 NEW WRAPPER TO CONTROL NAVBAR
function Layout() {
  const location = useLocation();

  // ❌ Hide navbar on dashboard
  const hideNavbar = location.pathname === "/dashboard";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <Scan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;