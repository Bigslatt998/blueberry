import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import { iProduct } from '../types';
// import { db } from '../firebase';
import { db } from '../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
interface WishlistContextType {
  wishlist: iProduct[];
  toggleWishlist: (product: iProduct) => void;
  isInWishlist: (productName: string) => boolean;
  removeFromWishlist: (productName: string) => void; // Add this
  clearWishlist: () => void;
  
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const getUserWishlistDocRef = () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not logged in');
  return doc(db, 'wishlists', user.uid);
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<iProduct[]>([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        try {
          const wishlistDocRef = getUserWishlistDocRef();
          const docSnap = await getDoc(wishlistDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setWishlist(data.items || []);
          } else {
            setWishlist([]);
          }
        } catch (error) {
          console.error('Error loading wishlist from Firestore:', error);
        }
      } else {
        setWishlist([]); // Clear wishlist on logout
      }
    });
    return () => unsubscribe();
  }, []);


  // Check if product is in wishlist
  const isInWishlist = (productName: string) => {
    return wishlist.some(item => item.name === productName);
  };

  // Save wishlist to Firestore
  const saveWishlistToFirestore = async (newWishlist: iProduct[]) => {
    try {
      const wishlistDocRef = getUserWishlistDocRef();
      await setDoc(wishlistDocRef, {
        items: newWishlist,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving wishlist to Firestore:', error);
    }
  };

    const removeFromWishlist = (productName: string) => {
    setWishlist(prev => {
      const newWishlist = prev.filter(item => item.name !== productName);
      saveWishlistToFirestore(newWishlist);
      toast.success(`${productName} removed from wishlist`);
      return newWishlist;
    });
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
    saveWishlistToFirestore([]);
    toast.success('Wishlist cleared');
  };

 // Add/remove from wishlist
  const toggleWishlist = (product: iProduct) => {
    const user = getAuth().currentUser;
    if (!user) {
      Swal.fire({
      icon: 'warning',
      title: 'Please log in',
      text: 'You need to log in to add products to your wishlist.',
      confirmButtonText: 'Go to Login'
    }).then(result => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    });
    return;
    }
    setWishlist(prev => {
      const alreadyExists = prev.some(item => item.name === product.name);
      let newWishlist;
      if (alreadyExists) {
        toast.success(`${product.name} removed from wishlist`);
        newWishlist = prev.filter(item => item.name !== product.name);
      } else {
        toast.success(`${product.name} added to wishlist`);
        newWishlist = [...prev, product];
      }
      saveWishlistToFirestore(newWishlist);
      return newWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, 
    isInWishlist, clearWishlist, removeFromWishlist  }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};