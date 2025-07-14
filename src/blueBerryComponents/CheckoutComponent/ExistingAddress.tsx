import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useCart } from '../CartContext';
import Swal from 'sweetalert2';
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { db } from '../../firebase.config'; 
import { DottedLoading } from "../Loader/DottedLoading";
interface CartProps {
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>
}
type UserData = {
  id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  postCode?: string;
  country?: string;
  state?: string;
  city?: string
};

const ExistingAddress = (props: CartProps) => {
  const auth = getAuth();
   const [data, setData] = useState<UserData[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const dataCollectionRef = collection(db, 'RegisteredUsers')
      const { cart, ClearCart, subtotal, vat, total } = useCart();
  function removeUndefinedFields<T extends object>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).filter(([v]) => v !== undefined)
    ) as T;
  }
  
  // const currentUser = auth.currentUser;
  const orderId = Math.floor(1000 + Math.random() * 9000).toString(); 
  const orderData = {
          orderId,
          products: cart.map(item => removeUndefinedFields(item)),
          total,
          status: false,
          createdAt: Timestamp.now(),
          userId: currentUser?.uid || ""
        };
  const navigate = useNavigate()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
      })
      return () => unsubscribe()
    }, [])
  
    // Fetch Firestore data
    useEffect(() => {
      const fetchData = async () => {
        const querySnapshot = await getDocs(dataCollectionRef)
        const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setData(fetchedData)
        setLoading(false)
      }
      fetchData()
    }, [])
  
    // Find current user data in Firestore
    useEffect(() => {
      if (currentUser && data.length > 0) {
        const userData = data.find(item => item.email === currentUser.email)
        setCurrentUserData(userData ?? null)
      }
    }, [currentUser, data])

  const handleProceed = async () => {
    if ( cart.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Your cart is empty',
          text: 'Please add items to your cart before proceeding.',
        });
        return;
      };
      try {
              await addDoc(collection(db, "orders"), orderData);
              console.log(orderData)
              // ClearCart();
              // navigate(`/order`);
              props.setIsCart(false)
              Swal.fire({
              icon: 'success',
              title: 'Your Order has been placed!',
              text: 'Check order?',
              showCancelButton: true,
              confirmButtonText: 'Go to Checkout',
              cancelButtonText: 'Cancel',
              customClass: {
                container: 'SwalContainer'
              }
            }).then((result) => {
              if(result.isConfirmed) {
              navigate(`/order`, {
                state: {
                  subtotal,
                  total,
                  vat,
                  products: cart
                }
              });
              }
            });
            } catch (error) {
              console.log("Failed to place order", error);
            }
    ClearCart()
      // navigate('/order')
    
  }

  return (
    <div className='AddyContain'>
      <div className='Adddy'>
        <div className="AddydisBox">
                          <p>Name</p>
                          <p>Address</p>
                          <p>Post code</p>
                        </div>
                        <div className="AddydisBox">
                          {loading ? (
                            <DottedLoading/>
                          ) : currentUser && currentUserData ? (
                            <>
                          <p>{currentUserData.firstname} {currentUserData.lastname}</p>
                          <p>{currentUserData.address}</p>
                          <p>{currentUserData.postCode}</p>
                            </>
                          ) : (
                            <p>NO USER FOUND</p>
                          )}
                        </div>
                        
                        <div className="AddydisBox">
                          <p>City</p>
                          <p>State</p>
                          <p>Country</p>
                        </div>
                        <div className="AddydisBox">
                          {loading ? (
                            <DottedLoading/>
                          ) : currentUser && currentUserData ? (
                            <>
                          <p>{currentUserData.city}</p>
                          <p>{currentUserData.state}</p>
                          <p>{currentUserData.country}</p>
                            </>
                          ) : (
                            <p>NO USER FOUND</p>
                          )}
                        </div>
              
    </div>
<button className='checkout' onClick={handleProceed}>Procced</button>

    </div>
  )
}

export default ExistingAddress