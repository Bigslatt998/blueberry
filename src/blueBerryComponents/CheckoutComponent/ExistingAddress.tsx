import { useNavigate } from "react-router-dom"
import { useCart } from '../CartContext';
import Swal from 'sweetalert2';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../../firebase.config'; 
interface CartProps {
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>
}

const ExistingAddress = (props: CartProps) => {
  const auth = getAuth();
      const { cart, ClearCart, subtotal, vat, total } = useCart();
  function removeUndefinedFields<T extends object>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).filter(([v]) => v !== undefined)
    ) as T;
  }
  
  const currentUser = auth.currentUser;
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
                          <p>Taofeeq</p>
                          <p>No 22 ayilara</p>
                          <p>845255</p>
                        </div>
                        <div className="AddydisBox">
                          <p>City</p>
                          <p>State</p>
                          <p>Country</p>
                        </div>
                        <div className="AddydisBox">
                          <p>Ilorin</p>
                          <p>Kwara</p>
                          <p>Nigeria</p>
                        </div>
              
    </div>
<button className='checkout' onClick={handleProceed}>Procced</button>

    </div>
  )
}

export default ExistingAddress