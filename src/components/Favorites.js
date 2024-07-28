import React, { useState, useEffect } from "react";
import { Card } from 'antd'
import { Link } from 'react-router-dom'


const Favorites = () => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);


    return (
        <div>
            <h2>Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favourites Added.</p>
            ) : (
                favorites.map(crypto => (
                    <Card key={crypto.id} title={crypto.name}>
                        <p>Symbol: {crypto.symbol.toUpperCase()}</p>
                        <p>Current Price: ${crypto.current_price}</p>
                        <Link to={`/crypto/${crypto.id}`}>View Details</Link>
                    </Card>
                ))
            )}
        </div>
    )
}

export default Favorites;