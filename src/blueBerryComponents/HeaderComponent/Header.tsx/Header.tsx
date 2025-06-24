import React, { useState, useEffect, useRef } from 'react'
import './Header.css'
import gsap from 'gsap'
import BlueBerryLogo from '../../../assets/blueBerryLogo.png'
import { FaShoppingCart, FaAngleDown, FaSearch, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXmark, FaXTwitter } from 'react-icons/fa6'
import { KeywordsList, explorCatList, exportProduct } from '../../../List'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faStar as farSStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar, faUser as farUser } from '@fortawesome/free-regular-svg-icons'
import RelatedProductCard from '../../HeaderComponent/Header.tsx/ReletedProductCard.tsx'
import { useWishlist } from '../../FavoriteContect.tsx'
import { useCart } from '../../CartContext.tsx'
import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
interface HeaderProps {
  isKeywords: boolean;
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>
  setisKeywords: React.Dispatch<React.SetStateAction<boolean>>
}

const Header =(props: HeaderProps)  => {
  const [isVegsDropDown, setIsVegDropDown] = useState<boolean>(false)
  const [isMyMenue, setIsMyMenue] = useState<boolean>(false)
  const cartRef = useRef<HTMLDivElement>(null)
  const HeaderRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate();
  
   useEffect(() => {
    if (!HeaderRef.current || !cartRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          gsap.to(cartRef.current, {
            opacity: entry.isIntersecting ? 0 : 1,
            duration: 0.3,
            ease: "power2.inOut",
            display: entry.isIntersecting ? 'none' : 'flex',
            overwrite: true
          })
        })
      },
      { threshold: 0.1 } // Trigger when 10% visible
    )

    observer.observe(HeaderRef.current)
    
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if(isMyMenue) {
      document.body.style.overflow= 'hidden';
      // document.body.style.background= 'rgba(0, 0, 0, 0.13)';
    }
    return () => {
      document.body.style.overflow= '';
      // document.body.style.background= '';

    }
  }, [isMyMenue])

  // useEffect(() => {
  //         if(props.isKeywords) {
  //           document.body.style.overflow= 'hidden';
  //           // document.body.style.background= 'rgba(0, 0, 0, 0.13)';
  //         }
  //         return () => {
  //           document.body.style.overflow= '';
  //           // document.body.style.background= '';
      
  //         }
  //       }, [props.isKeywords])
  const RelatedProduct = exportProduct.RelatedProducts
  const {wishlist} =useWishlist()
  const wishlistlength = wishlist.length

  const {cart} = useCart()
  const cartlength = cart.length

  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setIsUser(!!user);
  });
  return () => unsubscribe();
}, []);

const handleLogout = async () => {
  await signOut(getAuth());
  // Optionally navigate or show a message
};

const HandleLogin =  () => {
 navigate('/login')
  // Optionally navigate or show a message
};
const HandleRegister = () => {
  navigate('/register')
}

const HandleWishlist = () => {
  navigate('/wishlist')
  // console.log('working')
}
const handleHome = () => {
  navigate('/')
}
const handleProfile = () => {
  navigate('/profile')
}

const handleOrder = () => {
  navigate('/order')
}

const handleCart = () => {
  props.setIsCart(true)
}

     const handleCheckout = () => {
      const user = getAuth().currentUser;
              if (!user) {
                if (window.confirm('Please login')) {
                  setTimeout(() => navigate('/login'), 0);
                }
                return;
              }
      navigate('/Checkout')
    }
  return (
    <div className='HeaderContainer'>
        <div className="Header"  ref={HeaderRef}>
          <div className="IMG">
            <img onClick={handleHome} src={BlueBerryLogo}/>
              <div className="OptionMenue" 
              onClick={() => props.setisKeywords(!props.isKeywords)}>
                <div className=" Box Box1"></div>
                <div className=" Box Box2"></div>
                <div className=" Box Box3"></div>
                <div className=" Box Box4"></div>
              </div>
          </div>

          <div className="Search">
            <div className="Option">
              <div className="Veg">
              <span>Vegetable</span>
              <i onClick={() => setIsVegDropDown(!isVegsDropDown)}><FaAngleDown/></i>
              {isVegsDropDown && (
                <div className="VegDropDOwn">
                <ul>
                  <li>Vegetables</li>
                  <li>Bakery</li>
                  <li>Cold Drinks</li>
                  <li>Fruits</li>
                </ul>
              </div>
              )}
              
            </div>
            </div>
            
           <div className="SSSSS">
            <input type='Search' placeholder='Search products...'/>
            <i><FaSearch/></i>
           </div>
           </div>
           
           <div className="HeaderNav">
            <div className="box box1">
              <i><FontAwesomeIcon icon={farUser}/></i>
              {/* <i><FaUser/></i> */}
              <div className="Text">
                <span>Account</span>
                {isUser ? (
                  <span >Logout</span>
                ): (
                  <span >Login</span>
                )}
              </div>

              <div className="TextDropDOwn">
               {isUser ? (
    <ul>
      <li onClick={handleOrder}>Order</li>
      <li onClick={handleProfile}>My Profile</li>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  ) : (
    <ul>
      <li onClick={HandleRegister}>Register</li>
      <li onClick={handleCheckout}>Checkout</li>
      <li onClick={HandleLogin}>Login</li>
    </ul>
  )}
                </div>
            </div>
            <div className="box box2" onClick={HandleWishlist}>
              <div className="BoxWish" >
              <i><FontAwesomeIcon icon={farStar}/></i>
               <span>{wishlistlength}</span>
               </div>
              
              <div   className="Text">
                <span>{wishlistlength} items</span>
                <span>Wishlist</span>
              </div>
            </div>
            <div className="box box3" onClick={handleCart}>
              {/* <i><FontAwesomeIcon icon={farStar}/></i> */}
               <div className="BOXcart">
               <i><FaShoppingCart/></i>
               <span>{cartlength}</span>
               </div>
              <div  className="Text">
                <span>{cartlength} items</span>
                <span>Cart</span>
              </div>
            </div>

            {/* {isCart && (
              <div className='CartOpen'>
                Cart Open
              </div>
            )} */}

            <div className="OtherMenue" onClick={() => setIsMyMenue(true)}>
                <div className=" Box Box1"></div>
                <div className=" Box Box2"></div>
                <div className=" Box Box3"></div>
              </div>
              </div>       
        </div>
        <div className={`MYmenue ${isMyMenue ? 'active' : ''}`}>
          <div className="Mymenuheader">
            <p>My Menu</p>
            <i onClick={() => setIsMyMenue(false)}><FaXmark/></i>
          </div>

          <nav>
            <ul>
              <li>Home</li>
              <li>Categories</li>
              <li>Products</li>
              <li>Pages</li>
              <li>Blog</li>
              <li>Offers</li>
            </ul>
          </nav>

          
          <div className="Socials">
            <ul>
              <li><FaFacebook/></li>
              <li><FaXTwitter/></li>
              <li><FaInstagram/></li>
              <li><FaLinkedin/></li>
            </ul>
          </div>
        </div>

        <div className="CartDisplay" ref={cartRef}>
          <button className="CartDisplayyyyy">
               <i><FaShoppingCart/></i>
               <span>{cartlength}</span>
          </button>

          <button className="CartDisplayyyyy">
               <i><FontAwesomeIcon icon={farSStar}/></i>
               <span>{wishlistlength}</span>
          </button>
          {/* <i><FontAwesomeIcon icon={farUser}/></i>
          <i><FontAwesomeIcon icon={farStar}/></i> */}
        </div>
        {props.isKeywords && (
          <div className="KeyWords">
          <div className="KeyWordsContainer">
             <button className='ClostKey' onClick={() => props.setisKeywords(false)}></button>
           
            <p className='pKey' >Keywords</p>
            <ul>
           {KeywordsList.map((list) => (
            <li key={list.id}>{list.Text}</li>
           ))}
           </ul>
          <p className='pKey'>Explore Categories</p>

           <div className="CatList">
           {explorCatList.map((list) => (
            <div key={list.id} className="Box">
              <img src={list.img}/>
              <p>{list.Text}</p>
              <p>{list.acc}</p>
            </div>
              
           ))}
            
           </div>
          <p className='pKey'>Related Products</p>
          
          <div className="RelList">
            {RelatedProduct?.map((product) => (
            <RelatedProductCard key={product.id}   product={product}/>
           ))}
            

           </div>

          </div>
          </div>
        )}
        

    </div>
  )
}

export default Header