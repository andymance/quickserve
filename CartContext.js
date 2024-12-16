import React, { createContext, useState } from 'react';

// Create the context
export const CartContext = createContext();

// Provide the context to children components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  // Add to Cart feature
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

  //Remove the item feature
  const removeFromCart = (itemId) => { setCart((prevCart) => { const existingItem = prevCart.find((cartItem) => cartItem.id === itemId); if (existingItem.quantity === 1) { return prevCart.filter((cartItem) => cartItem.id !== itemId); } else { return prevCart.map((cartItem) => cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem ); } });
  };
  return (
    <CartContext.Provider value={{ cart, addToCart , removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};
