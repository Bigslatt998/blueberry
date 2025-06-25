import { useState } from 'react'
import './CartPage.css'
import { useCart } from '../CartContext';
import { useNavigate } from "react-router-dom"
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../HeaderComponent/Header.tsx/Header';
import Nav from '../HeaderComponent/NavComponet/Nav';
import Footer from '../HomeComponent/MainComponent/Footer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight as farAngle, faTrash} from '@fortawesome/free-solid-svg-icons'
import { Empty } from '../../List';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase"; 
import Swal from 'sweetalert2';
interface CartProps {
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>
}
export const CartPage = (props: CartProps) => {
const { cart, ClearCart, removeFromCart, updateQuantity, subtotal, total, vat } = useCart();
 const [isKeywords, setisKeywords] = useState<boolean>(false)
  const [isCart, setIsCart] = useState<boolean>(false);  
const navigate = useNavigate()
const auth = getAuth();
const currentUser = auth.currentUser;
  const handleCheck = async () => {
  if (cart.length === 0) return;

  const orderId = Math.floor(1000 + Math.random() * 9000).toString(); 
  const orderData = {
    orderId,
    products: cart,
    total,
    status: false,
    createdAt: Timestamp.now(),
    userId: currentUser?.uid
  };
  try {
    await addDoc(collection(db, "orders"), orderData);
    console.log(orderData)
    ClearCart();
    // navigate(`/trackorder`);
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
 
    const handleHome = () => {
      navigate('/')
    }
  return (
     <div className="CartPageContainer">
    <FlatOffer/>
    <Header isKeywords={isKeywords} setisKeywords={setisKeywords}
      isCart={isCart}
      setIsCart={setIsCart}
    />
    <Nav isKeywords={isKeywords} setisKeywords={setisKeywords}/>
    
     <div className="Reg">
              <div className="LogText">
              <p>Cart</p>
    
              <ul>
                <li><span onClick={handleHome}>Home</span> <span className='AngleRight'><FontAwesomeIcon icon={farAngle}/></span></li>
                <li className='little'>Cart</li>
              </ul>
              </div>
            </div>
        <div className="CartPContainer">
          <div className="Box1">
            <p className="Sumtext">Summary</p>
            <div className="summary">
              <div className="BOx1">
                <p>Sub-total</p>
                <p>VAT(20%)</p>
                <p>Coupon Discount</p>
              </div>
              <div className="BOx2">
                <p>$ {subtotal.toFixed(2)}</p>
                <p>{vat.toFixed(2)}</p>
                <p>Apply Coupon</p>
              </div>
            </div>
            <div className="coupon">
              <input placeholder='Coupon Code' />
              <button>Apply</button>
            </div>

            <div className="TotalAmount">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>

          </div>
          <div className="Box2">
            {cart.length === 0 ? (
              <div className='emptyCart'>
                          <img src={Empty} alt='Empty Cart'/>
              
                          <p> Hey LOOK! Your cart is empty <a href='/shop'>Go Shopping</a></p>
                  </div>
            ): (
              <table className="table">
              <thead>
                <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quanity</th>
                <th>Total</th>
              </tr>
              </thead>

              {cart.map((item, idx) => (
                    <tbody key={idx}>
                  <tr>
                <td className='Tbodimg'>
                  <img src={item.img} alt={item.name}/>
                  {item.name}
                </td>
                <td>$ {item.price}</td>
                <td>
                  <div className="Quantity">
                        <button onClick={() => updateQuantity(item.name, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                    </div>
                </td>
                <td>$ {((item.price ?? 0) * item.quantity).toFixed(2)} 
                  <span onClick={() => removeFromCart(item.name)} className='XXXX'><FontAwesomeIcon icon={faTrash}/></span></td>
                  </tr>
              </tbody>
              ))}
              

              <p onClick={ClearCart} className='Clearrr'>Clear cart<FontAwesomeIcon icon={faTrash}/></p>
              <button className='checkout' onClick={handleCheck}>Checkout</button>
            </table>
            
            )}
            
          </div>
        </div>
          <Footer/>
    </div>
  )
}