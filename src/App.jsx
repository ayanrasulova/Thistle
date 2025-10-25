import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import LaunchCanvas from './pages/LaunchCanvas';
import AboutUs from './pages/About Us';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/launch-canvas" element={<LaunchCanvas />} />
          <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
