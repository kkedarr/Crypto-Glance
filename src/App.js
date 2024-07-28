import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import CryptoList from './components/CryptoList';
import CryptoDetails from './components/CryptoDetails';
import AppHeader from "./components/Header";
import { Layout } from "antd";
import Favorites from "./components/Favorites"
import News from "./components/News"


const { Content } = Layout;


const App = () => {
  return (

    <Router>
      <Layout>
        <AppHeader />
        <Content>
          <Routes>
            <Route index element={<CryptoList />} />
            <Route exact path="/crypto/:id" element={<CryptoDetails />} />
            <Route exact path="/favorites" element={<Favorites />} />
            <Route exact path="/news" element={<News />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  )
}

export default App;
