import {useState} from 'react'
import './Wishlist.css'
import FlatOffer from '../../blueBerryComponents/HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../../blueBerryComponents/HeaderComponent/Header.tsx/Header';
import Nav from '../../blueBerryComponents/HeaderComponent/NavComponet/Nav';
import Footer from '../../blueBerryComponents/HomeComponent/MainComponent/Footer';
import StarRating from '../../blueBerryComponents/HeaderComponent/Header.tsx/Star.tsx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faXmark , faAnglesRight} from '@fortawesome/free-solid-svg-icons'
import { Empty } from '../../List';
import { useWishlist } from '../FavoriteContect';
import { useNavigate } from "react-router-dom";
import Cart from '../../blueBerryComponents/CartComponent/Cart';

const Wishlist = () => {
    const [isKeywords, setisKeywords] = useState<boolean>(false)
    const { wishlist, clearWishlist, removeFromWishlist } = useWishlist();
    const navigate = useNavigate();
    const [isCart, setIsCart] = useState<boolean>(false);
    const handleHome = () => {
      navigate('/')
    }
  return (
    <div className="WishlistContainer">
      <FlatOffer/>
      <Header isKeywords={isKeywords} setisKeywords={setisKeywords}
        isCart={isCart}
        setIsCart={setIsCart}
      />
      <Nav isKeywords={isKeywords} setisKeywords={setisKeywords}/>
      <div className="Reg">
                <div className="LogText">
                <p>Wishlist</p>
      
                <ul>
                  <li><span onClick={handleHome}>Home</span> <span className='AngleRight'><FontAwesomeIcon icon={faAnglesRight}/></span></li>
                  <li className='little'>Wishlist</li>
                </ul>
                </div>
              </div>
        <div className="WishContainer">
          {wishlist.length === 0 ? (
            <div className='emptywish'>
              <img src={Empty} alt='Empty Cart'/>
              <p> Hey LOOK! Your wishlist is empty</p>
              </div>
          ): (
            <>
            {wishlist.map((item, idx) => (
            <div key={idx}  className="wishItem">
              <div className="wishItemIMG">
                <img src={item.img}  alt={item.name}/>
              </div>

              <div className='wishText'>
                <div className='firstText'>
                  <p></p>
                  <StarRating productName={item.name}/>
                  </div>
                  <p className='firstof'>{item.name}</p>
                  <p className='lastof'>${item.price}</p>
                  </div>
                  <i onClick={() =>removeFromWishlist(item.name)} className='RemoveWish'>
                  <FontAwesomeIcon icon={faXmark} />
                  </i>
            </div>
            ))}
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

export default Wishlist