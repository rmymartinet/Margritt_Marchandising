import { create } from "zustand";

export const useStoreShopping = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart: (item) => {
    set((state) => {
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let newCart;

      if (itemIndex !== -1) {
        // Si l'item existe déjà dans le panier, on ajoute la nouvelle quantité
        const existingItem = state.cart[itemIndex];
        const newQuantity = Math.min(
          existingItem.quantity + item.quantity, // Cumuler la quantité existante avec la nouvelle
          Number(existingItem.stock) || 0 // Limiter par le stock disponible
        );

        newCart = [...state.cart];
        newCart[itemIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };
      } else {
        // Si l'item n'est pas encore dans le panier, on l'ajoute avec la quantité actuelle
        newCart = [
          ...state.cart,
          { ...item, quantity: Math.min(item.quantity, item.stock) },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },

  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),

  updateCart: (updatedCart) => {
    const validatedCart = updatedCart.map((item) => ({
      ...item,
      quantity: Math.min(item.quantity, item.stock), // Limiter la quantité au stock
    }));
    localStorage.setItem("cart", JSON.stringify(validatedCart));
    set(() => ({ cart: validatedCart }));
  },
}));
