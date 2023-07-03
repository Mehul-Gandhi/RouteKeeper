import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Conversion from './pages/Conversion';
import React  from "react";
import Maps from './pages/Maps';

function App() {
  return (
    <div>
      <Navbar />
    <Router>
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/conversion" element={<Conversion />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
    </Routes>
  </Router>
  </div>
);
}

export default App;
