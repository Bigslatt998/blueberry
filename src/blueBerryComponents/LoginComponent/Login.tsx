import React, {useState} from 'react'
import './Login.css'
import { auth } from '../../firebase'
import { useNavigate } from "react-router-dom";
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../HeaderComponent/Header.tsx/Header';
import Nav from '../HeaderComponent/NavComponet/Nav';
import Footer from '../HomeComponent/MainComponent/Footer';
import { signInWithEmailAndPassword } from "firebase/auth";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight as farAngle} from '@fortawesome/free-solid-svg-icons'
import Cart from '../CartComponent/Cart';
import { CakeLoading } from '../Loader/CakeLoading';
import ReCAPTCHA from "react-google-recaptcha";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [isCart, setIsCart] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  
  const handleHome = () => {
      navigate('/')
    }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
     switch(error.code){
      case 'auth/invalid-email':
        setErrorMsg("Invalid email format.");
        break;
        case 'auth/user-not-found':
          setErrorMsg("User not found. Please register.");
          break;
        case 'auth/wrong-password':
          setErrorMsg("Incorrect password. Please try again.");
          break;
          default:
          setErrorMsg("An error occurred. Please try again later.");
     }
    } finally {
    setLoading(false); 
  }
  };

  const HandleEmail = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setEmail(e.target.value)
  }  

  const HandlePassword = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setpassword(e.target.value)
  }

      const [isKeywords, setisKeywords] = useState<boolean>(false)
      

  return (
    <div className="LoginContainer">
    <FlatOffer/>
    <Header isKeywords={isKeywords} setisKeywords={setisKeywords}
      isCart={isCart}
      setIsCart={setIsCart}
    />
    <Nav isKeywords={isKeywords} setisKeywords={setisKeywords}/>
    
    <div className="Reg">
          <div className="LogText">
          <p>LOGIN</p>

          <ul>
            <li><span onClick={handleHome}>Home</span> <span className='AngleRight'><FontAwesomeIcon icon={farAngle}/></span></li>
            <li className='little'>LOGIN</li>
          </ul>
          </div>
        </div>

        <div className="LoContainer">
          <div className="LoginHeader">
          <p>Login</p>
          <p>Best place to <span className="buyXsel">buy and sell</span></p>
          </div>
    <form onSubmit={handleLogin}>
      <div className="LoginLabel">
      <label>
        <p>Email*</p>
        <input onChange={HandleEmail} type='text' placeholder='Enter email...' value={email}/>
      </label>
      <label>
        <p>Password*</p>
        <input onChange={HandlePassword} type='password' placeholder='Password...' value={password}/>
      </label>
      <ReCAPTCHA
        sitekey="6Lczj2srAAAAAPptpOTiuR8rJPrflh7WF79yATIo"
        onChange={value => setRecaptchaValue(value)}
      />
      <button type="submit">Login</button>

      {errorMsg && <p className="error">{errorMsg}</p>}
      </div>
    </form>
        <p className='LoginText'>Forget password? <a href="/login">Click here</a></p>

    </div>
     {isCart && (
        <Cart isCart={isCart}         
        setIsCart={setIsCart}/>
    )}
     {loading && (
              <div className='Cakeloading'>
                <CakeLoading/>
              </div>
             )}
      <Footer/>

    </div>
  )
}


// {errorMsg && (
//         <p>
//           {errorMsg}
//           {errorMsg.includes("not registered") && (
//             <a href="/register">Click here to register</a>
//           )}
//         </p>
//       )}