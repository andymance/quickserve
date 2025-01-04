import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]); // New state for order history

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem.id !== itemId);
      } else {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (order) => {
    setOrderHistory((prevOrders) => [...prevOrders, order]); // Save the order to history
    clearCart(); // Clear the cart after placing the order
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, placeOrder, orderHistory }}>
      {children}
    </CartContext.Provider>
  );
};