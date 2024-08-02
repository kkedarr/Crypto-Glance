import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import CryptoList from './components/CryptoList';
import CryptoDetails from './components/CryptoDetails';
import AppHeader from "./components/Header";
import { Layout } from "antd";
import Favorites from "./components/Favorites"
import News from "./components/News"
// src/index.js or src/App.js
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);



const { Content } = Layout;


const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = (checked) => {
    setDarkMode(checked);
  }

  return (
    <Router>
      <Layout className={darkMode ? 'dark-mode' : 'light-mode'} style={{ minHeight: '100vh' }}>
        <AppHeader darkMode={darkMode} onThemeChange={handleThemeChange} />
        <Layout>
          <Content style={{ padding: '0 50px', marginTop: '20px' }}>
            <Routes>
              <Route index element={<CryptoList />} />
              <Route path="/crypto/:id" element={<CryptoDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

export default App;
