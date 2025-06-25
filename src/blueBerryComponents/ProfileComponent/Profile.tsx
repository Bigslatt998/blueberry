import { useState, useEffect } from 'react'
import './Profile.css'
import { db, auth } from '../../firebase.config.ts';
import { onAuthStateChanged, User, getAuth } from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore'
import { useNavigate } from "react-router-dom"
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../HeaderComponent/Header.tsx/Header';
import Nav from '../HeaderComponent/NavComponet/Nav';
import Footer from '../HomeComponent/MainComponent/Footer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight as farAngle} from '@fortawesome/free-solid-svg-icons'
import Cart from '../CartComponent/Cart';
import {CakeLoading} from '../../blueBerryComponents/Loader/CakeLoading.tsx'
import {DottedLoading} from '../../blueBerryComponents/Loader/DottedLoading.tsx'
import Swal from 'sweetalert2';
type UserData = {
  id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
};
export const Profile = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const dataCollectionRef = collection(db, 'RegisteredUsers')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
    return () => unsubscribe()
  }, [])

  // Fetch Firestore data
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(dataCollectionRef)
      const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setData(fetchedData)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Find current user data in Firestore
  useEffect(() => {
    if (currentUser && data.length > 0) {
      const userData = data.find(item => item.email === currentUser.email)
      setCurrentUserData(userData ?? null)
    }
  }, [currentUser, data])

  // const handlelogout = async () => {
  //   try {
  //     await signOut(auth)
  //     navigate('/login')
  //   } catch (error) {
  //     console.error('Error signing out:', error)
  //   }
  // }


  // const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   try {
  //     await addDoc(dataCollectionRef, {
  //       firstname: fname,
  //       Student: isStudent,
  //       email: newemail
  //     })
  //     // Refresh data after adding
  //     const querySnapshot = await getDocs(dataCollectionRef)
  //     const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //     setData(fetchedData)
  //   } catch (error) {
  //     console.error('Error adding document:', error)
  //   }
  // }
  const [isKeywords, setisKeywords] = useState<boolean>(false)
  const [isCart, setIsCart] = useState(false);
 const handleHome = () => {
      navigate('/')
    }

     const handleCartpage = async () => {
      const user = getAuth().currentUser;
              if (!user) {
                if (window.confirm('Please login')) {
                  setTimeout(() => navigate('/login'), 0);
                }
                return;
              }
      navigate('/Cartpage')
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

     const handletrackorder = () => {
      const user = getAuth().currentUser;
              if (!user) {
      Swal.fire({
      icon: 'warning',
      title: 'Please log in',
      text: 'You need to log in to check your orders.',
      confirmButtonText: 'Go to Login'
    }).then(result => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    });
      return;
              }
      navigate('/order')
    }
  return (
     <div className="ProfileContainer">
    <FlatOffer/>
    <Header isKeywords={isKeywords} setisKeywords={setisKeywords}
      isCart={isCart}
      setIsCart={setIsCart}
    />
    <Nav isKeywords={isKeywords} setisKeywords={setisKeywords}/>
    
     <div className="Reg">
              <div className="LogText">
              <p>My profile</p>
    
              <ul>
                <li><span onClick={handleHome}>Home</span> <span className='AngleRight'><FontAwesomeIcon icon={farAngle}/></span></li>
                <li className='little'>profile</li>
              </ul>
              </div>
            </div>
        <div className="ProContainer">
          <div className="box1">
            <ul>
              <li>User</li>
              <li onClick={handleCartpage}>Cart</li>
              <li onClick={handleCheckout}>Checkout</li>
              <li onClick={handletrackorder}>Track Order</li>
            </ul>
          </div>
          <div className="box2">
            <div className="ProfileDisplay">
              <div className="NAmeDis">
                <div className="Box1"></div>
                <div className="Box2">
                  {loading ? (
                    <DottedLoading/>
                  ): currentUser && currentUserData ? (
                    <p className='welsomback'>Welcome Back! {currentUserData.firstname}.</p>
                  ) : (
                    <p className='welsomback'>NO USER FOUND</p>
                  )}
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Standard dummy text ever since the 1500s.</p>
                </div>
              </div>
            </div>
            <div className="ProfileText">
              <div className="ProfText">
              <p>About me</p>
              <p>Account Information:</p>
            <div className="INfoContainer">
                {loading ? (
                  <CakeLoading/>
                ): currentUser && currentUserData ? (
                  <>
                  <div className="Box">
              <p>E-mail address:</p>
              <hr/>
              <p>{currentUserData.email}</p>
            </div>
            <div className="Box">
              <p>Contact number:</p>
              <hr/>
              <p>{currentUserData.phoneNumber}</p>
            </div>
            <div className="Box">
              <p>House Address:</p>
              <hr/>
              <p>{currentUserData.address}</p>
            </div>
            <div className="Box">
              <p>Shipping Address:</p>
              <hr/>
              <p>3664 N E St,<br/>
              San Bernardino, California, 92405
              </p>
            </div>
                  </>
                ): (
                  <>
                <p>NO USER FOUND</p>
            </>
                )}
            </div>
            </div>
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
