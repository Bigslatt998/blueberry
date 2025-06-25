import { useState, useEffect } from 'react'
import './TrackOrder.css'
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase.config';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../HeaderComponent/Header.tsx/Header';
import Nav from '../HeaderComponent/NavComponet/Nav';
import Footer from '../HomeComponent/MainComponent/Footer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight as farAngle} from '@fortawesome/free-solid-svg-icons'
import Cart from '../CartComponent/Cart';
import { CakeLoading } from '../Loader/CakeLoading';

type Order = {
  id: string;
  orderId?: string;
  createdAt?: { toDate: () => Date };
  total?: number;
  status?: boolean;
};

export const TrackOrder = () => {
  const navigate = useNavigate()
  const [isKeywords, setisKeywords] = useState<boolean>(false)
  const [isCart, setIsCart] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const user = getAuth().currentUser;
    const handleHome = () => {
      navigate('/')
    }

   useEffect(() => {
      setLoading(true)
  const fetchOrders = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(fetchedOrders);
      console.log("Fetched orders:", fetchedOrders); // <-- log orders here
    } catch (error) {
      console.error('Error loading orders:', error);
    }finally{
      setLoading(false)
    }
  };
  fetchOrders();
}, [user]);
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
          ): orders.length === 0 ? (
            <p>You have no Order</p>
          ):(
            <>
            <table className="tableII">
              <thead>
                <tr>
                <th>Order ID</th>
                {/* <th>Shipping</th> */}
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
                {orders.map(order => (
          <tr key={order.id}>
            <td>{order.orderId}</td>
            <td>{order.createdAt?.toDate().toLocaleDateString()}</td>
            <td>${order.total?.toFixed(2)}</td>
            <td>{order.status ? "Completed" : "Pending"}</td>
            <td>
              <button onClick={() => navigate(`/order/${order.id}`)}>View</button>
            </td>
          </tr>
        ))}
              </tbody>
              </table>
            </>
          )}
           
        </div>
     {isCart && (
            <Cart isCart={isCart}         
            setIsCart={setIsCart}/>
        )}
          <Footer/>
    </div>
  )
}