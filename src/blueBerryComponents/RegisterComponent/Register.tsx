import React, {useState} from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import './Register.css'
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../HeaderComponent/Header.tsx/Header';
import Nav from '../HeaderComponent/NavComponet/Nav';
import Footer from '../HomeComponent/MainComponent/Footer';
import { locationData } from '../../List';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight as farAngle} from '@fortawesome/free-solid-svg-icons'
import Cart from '../CartComponent/Cart';
import { CakeLoading } from '../Loader/CakeLoading';
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";
export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postCode, setPostCode] = useState('')
  const [loading, setLoading] = useState<boolean>(false);
  const [Codeloading, setCodeloading] = useState<boolean>(false);

  const [verificationCode, setVerificationCode] = useState('');
const [sentCode, setSentCode] = useState('');
const [codeSent, setCodeSent] = useState(false);
const [ codeError, setCodeError] = useState('');
const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  // const [city, setCity] = useState('')
  const navigate = useNavigate();

   const handleHome = () => {
      navigate('/')
    }

  const HandleEmail = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setEmail(e.target.value)
  }  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!£$%&*]).{6,}$/;
  const HandlePassword = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value;
    setpassword(value);

    if (!passwordRegex.test(value)) {
      setPasswordStrength('Weak');
      setPasswordError(
        'Password must be at least 6 characters, include uppercase, lowercase, and a symbol (!£$%&*).'
      );
    } else {
      setPasswordStrength('Strong');
      setPasswordError('');
    }
  }
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const HandleFirstname = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setfirstname(e.target.value)
  }

  const Handlelastname = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setlastname(e.target.value)
  }

  const HandlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhoneNumber(value)
  }
   const HandleAddress = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setAddress(e.target.value)
  }

   const HandleCountry = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setCountry(e.target.value)
  }

   const HandleState= (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setState(e.target.value)
  }

   const HandleCity = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setCity(e.target.value)
  }

   const HandlePostCode = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPostCode(value)
  }

  const HandleRegister = async (e:  React.FormEvent) => {
    e.preventDefault();
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters, include uppercase, lowercase, and a symbol (!£$%&*).');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
     if (verificationCode === sentCode) {
          setCodeError('');
          Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You can now log in.',
          timer: 2000,
          showConfirmButton: false
        });
          navigate('/login');
        } else {
          setCodeError('Incorrect code. Please try again.');
          Swal.fire({
            icon: 'error',
            title: 'Incorrect Code',
            text: 'The verification code you entered is incorrect.',
          });
        }
    setPasswordError('');
    setLoading(true); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save user info to Firestore
      await addDoc(collection(db, "RegisteredUsers"), {
        firstname,
        lastname,
        email,
        phoneNumber,
        address,
        country,
        password,
        state,
        city,
        postCode,
        uid: userCredential.user.uid
      });
      // setEmail('')
      // setpassword('')
      // setfirstname('')
      // setlastname('')
      // setPhoneNumber('')
      
      console.log('User registered:', userCredential.user);
    } catch (error) {
      console.error('Error registering user:', error);
    } finally{
      setLoading(false);
    }
  }
    const [isKeywords, setisKeywords] = useState<boolean>(false)
    const [isCart, setIsCart] = useState<boolean>(false)
  
    const sendVerificationCode = async () => {
  const code = Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit code
  setSentCode(code);
  setCodeSent(true);
  setCodeloading(true); 


  // Send email using EmailJS
  try {
    await emailjs.send(
      'service_l2gm8zq',
      'template_sm6nv4e',
      {
        to_email: email,
        to_name: firstname,
        code: code,
      },
      'HNJz2Y8Qxdon-91G6'
    );
   Swal.fire({
    icon: 'success',
    title: 'Verification code sent!',
    text: 'Check your email for the verification code.',
    timer: 2500,
    showConfirmButton: false
  });
  } catch (error) {
    console.log(error)
    Swal.fire({
    icon: 'error',
    title: 'Failed to send verification code',
    text: 'Please try again later.',
  });
    setCodeSent(false);
  } finally{
    setCodeloading(false)
  }
};
  return (
    <div className='RegistrationContainer'>
        <FlatOffer/>
        <Header isKeywords={isKeywords} setisKeywords={setisKeywords}
          isCart={isCart}           // <-- pass this
          setIsCart={setIsCart}
        />
        <Nav isKeywords={isKeywords} setisKeywords={setisKeywords}/>

        <div className="Reg">
          <div className="RegText">
          <p>REGISTRATION</p>

          <ul>
            <li><span onClick={handleHome}>Home</span> <span className='AngleRight'><FontAwesomeIcon icon={farAngle}/></span> </li>
            <li className='little'>Register</li>
          </ul>
          </div>
        </div>

        <div className="FormContainer">
          <div className="FormHeader">
          <p>Register</p>
          <p>Best place to <span className="buyXsel">buy and sell</span></p>
          </div>
        <form onSubmit={HandleRegister}  
        >
          <div className="RegisterForm">
          <label>
            <p>First Name*</p>
            <input value={firstname} onChange={HandleFirstname} type='text' placeholder='Enter your first name' required/>
          </label>

          <label>
            <p>Last Name*</p>
            <input value={lastname} onChange={Handlelastname} type='text' placeholder='Enter your last name' required/>
          </label>

          <label>
            <p>Email*</p>
            <input value={email} onChange={HandleEmail} type='email' placeholder='example@gmail.com' required/>
          </label>

          <label>
            <p>Phone Number*</p>
            <input inputMode="numeric"
                    pattern="\d*" minLength={11} maxLength={15}
                    value={phoneNumber} onChange={HandlePhoneNumber} type='number' placeholder='Enter phoner number...' required/>
          </label>

          <label>
            <p>Password*</p>
            <input onChange={HandlePassword} type='password' placeholder='Create password' required/>
             <span style={{ color: passwordStrength === 'Strong' ? 'green' : 'red', fontSize: '0.9em' }}>
              {password && `Strength: ${passwordStrength}`}
            </span>
            {passwordError && (
            <span style={{ color: 'red', fontSize: '0.95em' }}>{passwordError}</span>
          )}
          </label>

           <label>
            <p>Confirm Password*</p>
            <input value={confirmPassword}
              onChange={handleConfirmPasswordChange} type='password' placeholder='Confirm Password' required/>
             <span style={{ color: 'red', fontSize: '0.9em' }}>
              {confirmPassword && password !== confirmPassword && 'Passwords do not match.'}
            </span>
          </label>

           

          <label className='Adddy'>
            <p>Address*</p>
            <input value={address} onChange={HandleAddress} type='text' placeholder='Adress Line 1' required/>
          </label>

          <label>
            <p>Country*</p>
            <select value={country} onChange={HandleCountry} required>
          <option value=''>Select your country</option>
          {Object.keys(locationData).map((countryName) => (
            <option key={countryName} value={countryName}>{countryName}</option>
          ))}
        </select>
            {/* <input value={country} onChange={HandleCounty} type='text' placeholder='Enter your country' required/> */}
          </label>
          
          <label>
            <p>Region State*</p>
            <select value={state} onChange={HandleState} required disabled={!country}>
          <option value=''>Select your state</option>
          {country && Object.keys(locationData[country]?.states || {}).map((stateName) => (
            <option key={stateName} value={stateName}>{stateName}</option>
          ))}
        </select>
            {/* <input value={state} onChange={HandleState} type='text' placeholder='Enter your state' required/> */}
          </label>

          <label>
            <p>City*</p>
            <select value={city} onChange={HandleCity} required disabled={!state}>
          <option value=''>Select your city</option>
          {country && state && (locationData[country]?.states[state] || []).map((cityName) => (
            <option key={cityName} value={cityName}>{cityName}</option>
          ))}
        </select>
          </label>

          <label>
            <p>Post Code*</p>
            <input inputMode="numeric"
                    pattern="\d*" minLength={4} maxLength={6} value={postCode} onChange={HandlePostCode} type='number' placeholder='Enter post code' required/>
          </label>

          </div>
          <ReCAPTCHA
            sitekey="6Lczj2srAAAAAPptpOTiuR8rJPrflh7WF79yATIo"
            onChange={value => setRecaptchaValue(value)}
          />

          {!codeSent ? (
            <button type='button' onClick={sendVerificationCode} disabled={!email || !recaptchaValue}>
              Send code
            </button>
          ): (
            <div>

              {Codeloading ? (
                <CakeLoading/>
              ): (
                <label>
      <p>Enter Verification Code</p>
      <input
        type="text"
        value={verificationCode}
        onChange={e => setVerificationCode(e.target.value)}
        maxLength={5}
        required
        className='CodeInput'
      />
    </label>
              )}
    <button type='submit'>Register</button>
     {codeError && <span style={{ color: 'red' }}>{codeError}</span>}
            </div>
          )}
          

        </form>
        <p className='LoginText'>Already have an account? <a href="/login">Login</a></p>
           {loading && (
          <div className='Cakeloading'>
            <CakeLoading/>
          </div>
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
