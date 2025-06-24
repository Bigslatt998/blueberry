import React, { useState, useEffect } from 'react'
import './Checkout.css'
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../HeaderComponent/Header.tsx/Header';
import Nav from '../HeaderComponent/NavComponet/Nav';
import Footer from '../HomeComponent/MainComponent/Footer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight as farAngle} from '@fortawesome/free-solid-svg-icons'
import Cart from '../CartComponent/Cart';
import { useCart } from '../CartContext';
import ExistingAddress from './ExistingAddress';


export const Checkout = () => {
  // const {subtotal, total, vat } = useCart();
  const [addressOption, setAddressOption] = useState<'existing' | 'new'>('existing');
  const navigate = useNavigate()
  const [isKeywords, setisKeywords] = useState<boolean>(false)
  const [isCart, setIsCart] = useState<boolean>(false);
  const location = useLocation();
const orderSummary = location.state || {};
const subtotal = orderSummary.subtotal ?? 0;
const total = orderSummary.total ?? 0;
const vat = orderSummary.vat ?? 0;
const products = orderSummary.products ?? [];
    const handleHome = () => {
      navigate('/')
    }
  return (
     <div className="CheckoutContainer">
    <FlatOffer/>
    <Header isKeywords={isKeywords} setisKeywords={setisKeywords}
      isCart={isCart}
      setIsCart={setIsCart}
    />
    <Nav isKeywords={isKeywords} setisKeywords={setisKeywords}/>
    
     <div className="Reg">
              <div className="LogText">
              <p>Checkout</p>
    
              <ul>
                <li><span onClick={handleHome}>Home</span> <span className='AngleRight'><FontAwesomeIcon icon={farAngle}/></span></li>
                <li className='little'>Checkout</li>
              </ul>
              </div>
            </div>
        <div className="CheckContainer">
          <div className='Box1'>
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

          <div className='Box2'>
            <p>Billing Details</p>
            <div className="SelectAddy">
            <div>
            <input type='radio'
            name='address'
            checked={addressOption === 'existing'}
            onChange={() => {
            setAddressOption('existing');
           navigate('', { state: { subtotal, total, 
                        vat, products } });
      }}
            />
            <p>I want to use an existing address</p>
          </div>
          <div>
            <input type='radio'
            name='address'
            checked={addressOption === 'new'}
            onChange={() => {
              setAddressOption('new');
              navigate('newaddress', { state: { subtotal, total,
                  vat, products } });
            }}
            />
            <p>I want to use a new address</p>
          </div>
            </div>
              <div className="Addydis">
                <Outlet/>
              </div>
          </div>
        </div>
     {isCart && (
            <Cart isCart={isCart}         
            setIsCart={setIsCart}/>
        )}
          <Footer/>
    </div>
  )
}


  // {/* Display current user info */}
  //     {loading ? (
  //       <p>Loading user info...</p>
  //     ) : currentUser && currentUserData ? (
  //       <div>
  //         <h2>Welcome, {currentUserData.firstname}!</h2>
  //         <p>Email: {currentUserData.email}</p>
  //         <p>Student: {currentUserData.Student ? "Yes" : "No"}</p>
  //       </div>
  //     ) : (
  //       <p>User info not found.</p>
  //     )}

  //     <form onSubmit={onsubmit}>
  //       <input value={fname} onChange={(e) => setFname(e.target.value)} type='text' placeholder='Enter first name...' />
  //       <input value={newemail} onChange={(e) => setNewemail(e.target.value)} type='text' placeholder='Enter email...' />
  //       <input checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} type='checkbox' />
  //       <button type='submit'>Submit</button>
  //     </form>
  //     {data.map(item => (
  //       <div key={item.id}>
  //         <h3>{item.firstname} {item.lastname}</h3>
  //         <p>Email: {item.email}</p>
  //       </div>
  //     ))}

  //     <button onClick={handlelogout}>Logout</button>