import React,{useState} from 'react'
import './Footer.css'
import BlueBerryLogo from '../../../assets/blueBerryLogo.png'
import Android from '../../../assets/android.png'
import AppleStore from '../../../assets/appleStore.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLocationDot as farLocation} from '@fortawesome/free-solid-svg-icons'

// import { faLoc as farStar} from '@fortawesome/free-regular-svg-icons'
import { FaShoppingCart, FaAngleDown, FaSearch, FaFacebook, FaInstagram, FaLinkedin, FaAngleDoubleDown, FaAngleDoubleUp, FaLocationArrow } from 'react-icons/fa'
import { faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

// type Props = {}




const Footer = () => {

    const [isOpen, setisOpen] = useState(false)
    const [isOpenII, setisOpenII] = useState(false)
    const [isOpenIII, setisOpenIII] = useState(false)
    const [isOpenIV, setisOpenIV] = useState(false)
  
  return (
    <div className='FooterContainer'>
        <footer>
        <div className="Box1">
            <img src={BlueBerryLogo} alt='logo'/>
            <p>BlueBerry is the biggest market of grocery products. Get your daily needs from our store.</p>
            <div className="IOSXAndriod">
                <img src={Android} alt='logo'/>
                <img src={AppleStore} alt='logo'/>
            </div>
        </div>
        <div className=" Box Box2">
            <div className="FooterBoxHeader">
            <p>Categories </p>
            <i onClick={ () => setisOpen(!isOpen)}>{isOpen ? <FaAngleDoubleUp/> : <FaAngleDoubleDown/>}</i>
            </div>
            <hr/>
                <ul className={`${isOpen ? 'show' : ''}`}>
                <li>Snacks</li>
                <li>Juice</li>
                <li>Chips</li>
                <li>Spices</li>
                <li>Sauces</li>
                <li>Fruits</li>
            </ul>
            
        </div>
        <div className="Box Box3">
             <div className="FooterBoxHeader">
            <p>Company </p>
            <i onClick={ () => setisOpenII(!isOpenII)}>{isOpenII? <FaAngleDoubleUp/> : <FaAngleDoubleDown/>}</i>
            </div>
            <hr/>
                 <ul className={`${isOpenII ? 'show' : ''}`}>
                <li>About us</li>
                <li>Delivery</li>
                <li>Legal notice</li>
                <li>Terms and condition</li>
                <li>Secure payment</li>
                <li>Contact us</li>
            </ul>
           
        </div>
        <div className=" Box Box4">
             <div className="FooterBoxHeader">
            <p>Account </p>
            <i onClick={ () => setisOpenIII(!isOpenIII)}>{isOpenIII ? <FaAngleDoubleUp/> : <FaAngleDoubleDown/>}</i>
            </div>
            <hr/>
                 <ul className={`${isOpenIII ? 'show' : ''}`}>
                <li>Sign in</li>
                <li>View cart</li>
                <li>Return policy</li>
                <li>Become a vendor</li>
                <li>Affiliate program</li>
                <li>Payments</li>
            </ul>
           
        </div>
        <div className=" Box Box5">
             <div className="FooterBoxHeader">
            <p>Contact </p>
            <i onClick={ () => setisOpenIV(!isOpenIV)}>{isOpenIV ? <FaAngleDoubleUp/> : <FaAngleDoubleDown/>}</i>
            </div>
            <hr/>
            
                <ul className={`${isOpenIV ? 'show' : ''}`}>
                <li><span><FontAwesomeIcon icon={farLocation}/></span>971 Lajamni, Motavarachha, Surat, Gujarat, Bharat 394101.</li>
                <li><span><FontAwesomeIcon icon={faWhatsapp}/></span>+00 9876543210</li>
                <li><span><FontAwesomeIcon icon={faEnvelope}/></span> blueberry@gmail.com</li>
                <div className="Socials">
                    <i><FaInstagram/></i>
                    <i><FaFacebook/></i>
                    <i><FontAwesomeIcon icon={faXTwitter}/></i>
                    <i><FaLinkedin/></i>
                </div>
            </ul>
           
            
        </div>
        </footer>
        </div>
    

  )
}

export default Footer;