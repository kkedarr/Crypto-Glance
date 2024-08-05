import React, { createContext, useState, useContext } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => useContext(FavoritesContext)

export const FavoritesProvider = ({ children }) => {
    const [favourites, setFavorites] = useState([])

    const addFavorite = (coin) => {
        setFavorites([...FavoritesProvider, coin])
    }

    const removeFavorite = (coinId) => {
        setFavorites(favourites.filter(fav => fav.id !== coinId))
    }

    return (
        <FavoritesContext.Provider value={{ addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}