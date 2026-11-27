import React, { createContext, useState } from 'react';

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = image => {
    setFavorites(prev => [...prev, image]);
  };

  return (
    <GalleryContext.Provider
      value={{
        favorites,
        addFavorite,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
