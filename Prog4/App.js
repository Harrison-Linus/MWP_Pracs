import React from 'react';
// Step 4: Import Router components
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles.css'; 

// Step 3: Create Components (Kept in one file for minimal hassle)
const Home = () => <div className="container"><h1>Home</h1><p>Welcome to Harrison's SPA.</p></div>;
const About = () => <div className="container"><h1>About</h1><p>Cloud Engineer & MERN Developer.</p></div>;
const Contact = () => <div className="container"><h1>Contact</h1><p>Email: me@harrison.com</p></div>;

export default function App() {
  return (
    // Step 4: Wrap everything in BrowserRouter
    <BrowserRouter>
      
      {/* Step 5: Configure Navigation (No page reloads!) */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Step 6: Render Components Dynamically based on the URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </BrowserRouter>
  );
}