import React, { useEffect, useState } from "react";
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import '../styles/Favorites.css'

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    return (
        <div className={darkMode ? 'ant-card' : 'ant-card'}>
            <h2>Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorites added.</p>
            ) : (
                favorites.map(crypto => (
                    <Card key={crypto.id} title={crypto.name}>
                        <p>Symbol: {crypto.symbol.toUpperCase()}</p>
                        <p>Current Price: ${crypto.current_price}</p>
                        <Link to={`/crypto/${crypto.id}`}>Chart Details</Link>
                    </Card>
                ))
            )}
        </div>
    );
};

export default Favorites;
