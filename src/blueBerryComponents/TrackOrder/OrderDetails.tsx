import { useState, useEffect } from 'react'
import './OrderDetails.css'
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase.config';
import { useNavigate } from "react-router-dom"
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../HeaderComponent/Header.tsx/Header';
import Nav from '../HeaderComponent/NavComponet/Nav';
import Footer from '../HomeComponent/MainComponent/Footer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight} from '@fortawesome/free-solid-svg-icons'
import { CakeLoading } from '../Loader/CakeLoading';

type OrderType = {
  orderId: number;
  status: boolean;
  total: number;
  createdAt: { toDate: () => Date };
  
  products: { name: string; quantity: number; price: number; img: string, status: boolean }[];
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
          if (!orderId) return;
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
                <li><span onClick={handleHome}>Home</span> <span className='AngleRight'><FontAwesomeIcon icon={faAnglesRight}/></span></li>
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
            <div className="StusDisplay">
          {/* {order.products.map((item) => ( */}
              <p>{order.status ? "Completed" : "Pending..."}</p>
          {/* ))} */}
            </div>
            <table className="table">
              
              <thead>
                <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Date</th>
                </tr>
               </thead>
               <tbody>
               {order.products.map((item, idx) => (
                 <tr key={idx}>
                  <td>{idx}</td>
                  <td><img className='orderIMG' src={item.img} alt={item.name}/></td>
                   <td>{item.name}</td>
                   <td>${item.price.toFixed(2)}</td>
                   <td>{item.quantity}</td>
                   <td>{order.createdAt?.toDate().toLocaleDateString()}</td>
                 </tr>
               ))}
               </tbody>
            </table>

            </>
        )}
     
        </div>
                  <Footer/>
        
    </div>
  )
}

{/* <h2>Order #{order.orderId}</h2>
        <p>Status: {order.status}</p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <ul>
        {order.products.map((item, idx) => (
          <li key={idx}>
            {item.name} x {item.quantity} - ${item.price}
          </li>
        ))}
      </ul> */}