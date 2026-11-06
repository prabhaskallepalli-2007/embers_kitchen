import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Dish, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (dish: Dish, quantity?: number) => void;
  removeFromCart: (dishId: number) => void;
  updateQuantity: (dishId: number, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  getOrderSummaryText: (customerName?: string, address?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ember_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ember_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (dish: Dish, quantity: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { dish, quantity }];
      }
    });
  };

  const removeFromCart = (dishId: number) => {
    setCart(prev => prev.filter(item => item.dish.id !== dishId));
  };

  const updateQuantity = (dishId: number, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.dish.id === dishId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const gstAmount = Math.round(subtotal * 0.05); // 5% Restaurant GST
  const grandTotal = subtotal + gstAmount;

  const getOrderSummaryText = (customerName: string = '', address: string = '') => {
    const lines = [
      `🔥 *Ember Kitchens — Order Request*`,
      `Date: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}`,
      customerName ? `Guest: ${customerName}` : '',
      address ? `Delivery To: ${address}` : '',
      `----------------------------`,
      ...cart.map(item => `• ${item.quantity}x ${item.dish.name} (₹${item.dish.price * item.quantity})`),
      `----------------------------`,
      `Subtotal: ₹${subtotal}`,
      `GST (5%): ₹${gstAmount}`,
      `Estimated Total: ₹${grandTotal}`,
      `----------------------------`,
      `Thank you for dining with Ember Kitchens, Mumbai.`
    ].filter(Boolean);

    return lines.join('\n');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        gstAmount,
        grandTotal,
        getOrderSummaryText
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
