import React from 'react'
import { useFavorites } from '../context/FavouritesContext'

const Coin = ({ coin }) => {
    const { addFavorite } = useFavorites()
    return (
        <div>
            <h2>{coin.name}</h2>
            <button onClick={() => addFavorite(coin)}>Add to Favorites</button>
        </div>
    )
}

export default Coin