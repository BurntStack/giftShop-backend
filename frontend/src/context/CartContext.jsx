import { createContext, useContext, useEffect, useState } from 'react';
import * as cartService from '../services/cart';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    if (!user) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      setCart(await cartService.getCart());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function addItem(productId, quantity = 1) {
    setCart(await cartService.addToCart(productId, quantity));
  }

  async function updateItem(itemId, quantity) {
    setCart(await cartService.updateCartItem(itemId, quantity));
  }

  async function removeItem(itemId) {
    setCart(await cartService.removeCartItem(itemId));
  }

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider value={{ cart, loading, itemCount, addItem, updateItem, removeItem, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
