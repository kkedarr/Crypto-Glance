import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './styles/Favorites.css';
import './styles/News.css';
import './styles/Login.css';
import CryptoList from './components/CryptoList';
import CryptoDetails from './components/CryptoDetails';
import AppHeader from "./components/Header";
import { Layout } from "antd";
import Favorites from "./components/Favorites";
import News from "./components/News";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Login from "./components/Login";

import logoLight from './images/logo-light.png';
import logoDark from './images/logo-dark.png';
import logoTextDark from './images/logo-text-dark.png'
import logoTextLight from './images/logo-text-light.png'

const { Content } = Layout;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = (checked) => {
    setDarkMode(checked);
  };

  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Layout className={darkMode ? 'dark-mode' : 'light-mode'} style={{ minHeight: '100vh' }}>
            <AppHeader darkMode={darkMode} onThemeChange={handleThemeChange} logo={darkMode ? logoDark : logoLight} logoText={darkMode ? logoTextDark : logoTextLight} />
            <Layout className={darkMode ? 'dark-mode' : 'light-mode'}>
              <Content style={{ padding: '0 50px', marginTop: '20px' }}>
                <Routes>
                  <Route index element={<CryptoList />} />
                  <Route path="/crypto/:id" element={<CryptoDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
