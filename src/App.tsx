// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TutorProfile from './pages/TutorProfile';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Forum from './pages/Forum';
import Login from './pages/Login'; // Import Login component
import Apply from './pages/Apply';
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutor/:id" element={<TutorProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/login" element={<Login />} /> {/* Added login route */}
        <Route path="/apply" element={<Apply />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
