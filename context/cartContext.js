"use client";
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        return state.map(item =>
            item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1}
            : item
        ); // prevent duplicates
      }
      return [...state, {...action.payload, quantity: 1}];

    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.payload._id);

    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item._id === action.payload._id
        ? {...item, quantity: item.quantity > 1 ? item.quantity - 1: 1}
        : item
      )
    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
