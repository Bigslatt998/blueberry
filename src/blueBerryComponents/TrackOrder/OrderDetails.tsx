import React, { useState, useEffect } from 'react'
import './TrackOrder.css'
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom"
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../HeaderComponent/Header.tsx/Header';
import Nav from '../HeaderComponent/NavComponet/Nav';
import Footer from '../HomeComponent/MainComponent/Footer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight as farAngle} from '@fortawesome/free-solid-svg-icons'
import Cart from '../CartComponent/Cart';
import { CakeLoading } from '../Loader/CakeLoading';

type OrderType = {
  orderId: number;
  status: boolean;
  total: number;
  products: { name: string; quantity: number; price: number }[];
};
export const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<OrderType | null>(null);
  const navigate = useNavigate()
  const [isKeywords, setisKeywords] = useState<boolean>(false)
  const [isCart, setIsCart] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    
  const handleHome = () => {
      navigate('/')
    }

    useEffect(() => {
        setLoading(true)
      const fetchOrders = async () => {
        try {
         const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setOrder(docSnap.data() as OrderType);
        } catch (error) {
          console.error('Error loading orders:', error);
        } finally{
            setLoading(false)
        }
      }
      fetchOrders();
    }, [orderId]);
    
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
              <p>Order</p>
    
              <ul>
                <li><span onClick={handleHome}>Home</span> <span className='AngleRight'><FontAwesomeIcon icon={farAngle}/></span></li>
                <li className='little'>Order</li>
              </ul>
              </div>
            </div>
        <div className="TrackContainer">
        {loading ? (
            <CakeLoading/>
        ) : !order ? (
            <p>You have no order</p>
        ): (
            <>
            <h2>Order #{order.orderId}</h2>
        <p>Status: {order.status}</p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <ul>
        {order.products.map((item, idx) => (
          <li key={idx}>
            {item.name} x {item.quantity} - ${item.price}
          </li>
        ))}
      </ul>
            </>
        )}
     
        </div>
                  <Footer/>
        
    </div>
  )
}