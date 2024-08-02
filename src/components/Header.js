import React from "react"
import { Layout, Menu } from "antd"
import { Link } from "react-router-dom"
import "../styles/Header.css"

const { Header } = Layout;

const AppHeader = ({ darkMode }) => {
    return (
        <Header className={darkMode ? "header-dark" : "header-light"}>
            <div className="logo" />
            <Menu theme={darkMode ? "dark" : "light"} mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/favorites">Favorites</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default AppHeader;