import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '../firebase'; // Adjust path if needed
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// Helper to remove undefined fields
function removeUndefined(obj: any) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}

// Define your product type
export interface iProduct {
  id: number;
  name: string;
  price: number;
  img: string;
  DelPrice: number;
  type: string;
  // Add other product fields as needed
}

export interface CartItem extends iProduct {
  quantity: number;
  selectedSize?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: iProduct, quantity?: number, size?: string) => void;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, newQuantity: number) => void;
  ClearCart: () => void;
  subtotal: number; 
  vat: number;   
  total: number;
}

export const CartContext = createContext<CartContextType>(null!);

const getUserCartDocRef = () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not logged in');
  return doc(db, 'Cart', user.uid);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate()
  // 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        try {
          const cartDocRef = getUserCartDocRef();
          const docSnap = await getDoc(cartDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setCart(data.items || []);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.error('Error loading cart from Firestore:', error);
        }
      } else {
        setCart([]);
      }
    });
    return () => unsubscribe();
  }, []);
  // 
  const addToCart = async (product: iProduct, quantity = 1, size?: string) => {
    const user = getAuth().currentUser;
        if (!user) {
          Swal.fire({
            icon: 'warning',
            title: 'Please log in',
            text: 'You need to log in to save products to your cart.',
            confirmButtonText: 'Go to Login'
          }).then(result => {
            if (result.isConfirmed) {
              navigate('/login');
            }
          });
          return;
        }
  setCart(prev => {
    // Check for existing item by name (and size if you use it)
    const exists = prev.some(item => item.name === product.name && item.selectedSize === size);
    if (exists) {
      toast.info(`${product.name} is already in cart`);
      return prev;
    }
    const updatedCart = [...prev, removeUndefined({ ...product, quantity, selectedSize: size })];
    // Save to Firestore
    (async () => {
      try {
        const cartDocRef = getUserCartDocRef();
        await setDoc(cartDocRef, {
          items: updatedCart,
          updatedAt: new Date()
        }, { merge: true });
      } catch (error) {
        console.error('Error saving to Firestore:', error);
      }
    })();
    toast.success(`${product.name} is added to cart`);
    return updatedCart;
  });
  };

  const removeFromCart = async (productName: string) => {
   setCart(prev => {
    const updatedCart = prev.filter(item => item.name !== productName);
    // Save to Firestore
    (async () => {
      try {
        const cartDocRef = getUserCartDocRef();
        await setDoc(cartDocRef, {
          items: updatedCart,
          updatedAt: new Date()
        }, { merge: true });
      } catch (error) {
        console.error('Error removing from Firestore:', error);
      }
    })();
    toast.info('Item removed from cart');
    return updatedCart;
  });
  };

  const updateQuantity = async (productName: string, newQuantity: number) => {
    setCart(prev => {
    const updatedCart = prev.map(item =>
      item.name === productName ? { ...item, quantity: newQuantity } : item
    );
    // Save to Firestore
    (async () => {
      try {
        const cartDocRef = getUserCartDocRef();
        await setDoc(cartDocRef, {
          items: updatedCart,
          updatedAt: new Date()
        }, { merge: true });
      } catch (error) {
        console.error('Error updating Firestore:', error);
      }
    })();
    return updatedCart;
  });
  };

  const ClearCart = async () => {
    setCart([]);
  toast.info('Cart cleared');
  try {
    const cartDocRef = getUserCartDocRef();
    await setDoc(cartDocRef, {
      items: [],
      updatedAt: new Date()
    }, { merge: true });
  } catch (error) {
    console.error('Error clearing cart in Firestore:', error);
  }
};
 
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const vat = subtotal * 0.2;
    const total = subtotal + vat;

  // <p>$ {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
  return (
    <CartContext.Provider value={{ cart, ClearCart, vat, addToCart, removeFromCart, updateQuantity, subtotal, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};