import React,{useEffect} from 'react'
import './Cart.css'
import { useCart } from '../CartContext';
import { Empty } from '../../List';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faXmark as farXmark, faTrash} from '@fortawesome/free-solid-svg-icons'
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase"; 
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';

// type Props = {}
interface CartProps {
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>
}
const  Cart = (props: CartProps) => {
    const { cart, ClearCart, subtotal, vat, total, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate()
function removeUndefinedFields<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([v]) => v !== undefined)
  ) as T;
}
const auth = getAuth();
const currentUser = auth.currentUser;
      const handleCheck = async () => {
      if (cart.length === 0) return;
    
      const orderId = Math.floor(1000 + Math.random() * 9000).toString(); 
      const orderData = {
        orderId,
        products: cart.map(item => removeUndefinedFields(item)),
        total,
        status: false,
        createdAt: Timestamp.now(),
        userId: currentUser?.uid || ""
      };
      try {
        await addDoc(collection(db, "orders"), orderData);
        console.log(orderData)
        ClearCart();
        navigate(`/trackorder`);
        Swal.fire({
        icon: 'success',
        title: 'Your Order has been placed!',
        text: 'Check order?',
        showCancelButton: true,
        confirmButtonText: 'Go to Checkout',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if(result.isConfirmed) {
        navigate(`/Checkout`, {
          state: {
            subtotal,
            total,
            vat,
            products: cart
          }
        });
        ClearCart();
    
        }
      });
      } catch (error) {
        console.log("Failed to place order", error);
      }
    };
    useEffect(() => {
        if(props.isCart) {
          document.body.style.overflow= 'hidden';
          // document.body.style.background= 'rgba(0, 0, 0, 0.13)';
        }
        return () => {
          document.body.style.overflow= '';
          // document.body.style.background= '';
    
        }
      }, [props.isCart])
    return (
    <div className={`CartOpen ${props.isCart ? 'CartAvtive' : ''}`}>
                <div className="CartCObtainer">
                <i className='CartClose' onClick={() => props.setIsCart(false)}></i>
                <div className="CartDetails">
                  <div className="CCCCArt">
                <p className="mycartTe" >My Cart</p>
                {cart.length === 0 ? (
                  <p></p>
                ): (
                <p onClick={ClearCart}><FontAwesomeIcon icon={faTrash}/></p>
                    
                )}
              </div>
                <div className='CartList'>
                {cart.length === 0 ? (
                <div className='emptyCart'>
            <img src={Empty} alt='Empty Cart'/>

            <p> Hey LOOK! Your cart is empty <a href='/shop'>Go Shopping</a></p>
            </div>
          ) : (
            <>
            <ul>
              {cart.map((item, idx) => (
                <div key={idx} className="CartItem">
                    <div className="CartItemIMG">
                  <img src={item.img} alt={item.name}/>
                  </div>
                  <div className='CartText'>
                    <p>{item.name}</p>
                    <p>$ {item.price}</p>
                    <div className="Quantity">
                        <button onClick={() => updateQuantity(item.name, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                    <i className='RemoveItem' onClick={() => removeFromCart(item.name)}>
                    <FontAwesomeIcon icon={farXmark} />
                    </i>
                </div>
              ))}
            </ul>
            <hr/>
            <div className="TotalContainer">
                <div className="TotalText">
                   <p>Sub-Total:</p>
                   <p>Vat (20%):</p>
                   <p className='TotalP'>Total:</p>
                </div>

                <div className="TotalText">
                   <p>${subtotal.toFixed(2)}</p>
                   <p>${vat.toFixed(2)}</p>
                   <p className='TotalP'>${total.toFixed(2)}</p>
                   <button onClick={handleCheck}>Checkout</button>
                </div>
            </div>
            </>
          )}
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Cart