import { create } from 'zustand';

const useGalleryStore = create(set => ({
  favorites: [],

  addFavorite: image =>
    set(state => ({
      favorites: [...state.favorites, image],
    })),
}));

export default useGalleryStore;
