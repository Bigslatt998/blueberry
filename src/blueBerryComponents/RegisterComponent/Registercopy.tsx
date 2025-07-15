import {useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import './Register.css'
import { auth, db } from '../../firebase.config.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer.tsx';
import Header from '../HeaderComponent/Header.tsx/Header.tsx';
import Nav from '../HeaderComponent/NavComponet/Nav.tsx';
import Footer from '../HomeComponent/MainComponent/Footer.tsx';
import { locationData } from '../../List.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight as farAngle} from '@fortawesome/free-solid-svg-icons'
import Cart from '../CartComponent/Cart.tsx';
import { CakeLoading } from '../Loader/CakeLoading.tsx';
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";
interface iRegisterInfo {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  ConfirmPassword: string;
  address: string;
  postCode: string;
  country: string;
  state: string;
  city: string;
}
const schema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must not exceed 16 characters'),
    // .matches(
    //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    // ),
  ConfirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('select a country'),
  state: yup.string().required('select a state'),
  city: yup.string().required('select a city'),
  postCode: yup.string().required('Postal code is required').min(4, 'Postal code must be at least 4 characters').max(8),
});
export const Register = () => {
 
  const [Codeloading, setCodeloading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [verificationCode, setVerificationCode] = useState('');
const [sentCode, setSentCode] = useState('');
const [codeSent, setCodeSent] = useState<boolean>(false);
const [ codeError, setCodeError] = useState('');
const [resendDisable, setResendDisabe] = useState<boolean>(false);
const [resendCountDown, setResendCountDown] = useState<number>(0);

const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
// const [country, setCountry] = useState('')
  // const [city, setCity] = useState('')
  // const [state, setState] = useState('')
const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch
  } = useForm<iRegisterInfo>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      password: '',
      ConfirmPassword: '',
      address: '',
      postCode: '',
      country: '',
      state: '',
      city: ''
    }
  });
  const country = watch('country');
  const state = watch('state');
  const navigate = useNavigate();

   const handleHome = () => {
      navigate('/')
    }



  // const HandleRegister = async (data:iRegisterInfo) => {
  //   console.log(data)
  //      if(verificationCode === '' ){
  //           Swal.fire({
  //           icon: 'error',
  //           title: 'Enter verification code',
  //           text: 'Verification input cant be empty.',
  //         });
  //       } else if (verificationCode === sentCode  ) {
  //               setCodeError('');
  //               Swal.fire({
  //               icon: 'success',
  //               title: 'Registration Successful!',
  //               text: 'You can now log in.',
  //               timer: 2000,
  //               showConfirmButton: false
  //             });
      
  //       } 
  //       else {
  //         setCodeError('Incorrect code. Please try again.');
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Incorrect Code',
  //           text: 'The verification code you entered is incorrect.',
  //         });
  //       }
  //   setLoading(true); 
  //       try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  //   //   // Save user info to Firestore
  //     await addDoc(collection(db, "RegisteredUsers"), {
  //       ...data,
  //       uid: userCredential.user.uid
  //     });
  //     console.log('User registered:', userCredential.user);
  //     reset(); // Reset form fields
  //   navigate('/login');
  //   } catch (error) {
  //     console.error('Error registering user:', error)
  //   }finally{
  //     setLoading(false);
  //   }
  // }

  const HandleRegister = async (data: iRegisterInfo) => {
  setLoading(true);
  if (verificationCode === '') {
    Swal.fire({
      icon: 'error',
      title: 'Enter verification code',
      text: 'Verification input cant be empty.',
    });
    setLoading(false);
    return;
  }
  if (verificationCode !== sentCode) {
    setCodeError('Incorrect code. Please try again.');
    Swal.fire({
      icon: 'error',
      title: 'Incorrect Code',
      text: 'The verification code you entered is incorrect.',
    });
    setLoading(false);
    return;
  }
  setCodeError('');
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    await addDoc(collection(db, "RegisteredUsers"), {
      ...data,
      uid: userCredential.user.uid
    });
    console.log('User registered:', userCredential.user);
    reset();
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'You can now log in.',
      timer: 2000,
      showConfirmButton: false
    });
    navigate('/login');
  } catch (error: any) {
    console.error('Error registering user:', error);
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: error?.message || 'There was an error registering your account. Please try again.'
    });
  } finally {
    setLoading(false);
  }
};

    const [isKeywords, setisKeywords] = useState<boolean>(false)
    const [isCart, setIsCart] = useState<boolean>(false)
    const [recapErr, setRecapErr] = useState<boolean>(false)
  
    const sendVerificationCode = async () => {
  if (!recaptchaValue) {
    setRecapErr(true)
  }
  const code = Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit code
  setSentCode(code);
  setCodeSent(true);
  setCodeloading(true); 


  // Send email using EmailJS
  try {
    const email = getValues('email')
    const firstname = getValues('firstname')
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
    startResendCountdown(); // Start the countdown for resending the code
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
const startResendCountdown = () => {
  setResendDisabe(true);
  let seconds = 60;
  setResendCountDown(seconds);

  const timer = setInterval(() => {
    seconds -= 1;
    setResendCountDown(seconds);
    if(seconds <= 0) {
      clearInterval(timer)
      setResendDisabe(false);
    }
  }, 1000);
}
const resendCode = async () => {
  if(resendDisable) return; // Prevent resending if disabled
  setCodeError('');
  await sendVerificationCode();
}
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
        <form onSubmit={handleSubmit(HandleRegister)}  
        >
          <div className="RegisterForm">
          <label>
            <p>First Name*</p>
            <input  
            placeholder='Enter your first name' 
            {...register('firstname')}/>
            { errors.firstname && 
              <span className='Error'>{errors.firstname.message}</span>}
          </label>

          <label>
            <p>Last Name*</p>
            <input  
            type='text' placeholder='Enter your last name' 
            {...register('lastname')}/>
            { errors.lastname && (
              <span className='Error'>{errors.lastname.message}</span>)}
          </label>

          <label>
            <p>Email*</p>
            <input 
            type='email' placeholder='example@gmail.com' 
            {...register('email')}/>
            { errors.email && (
              <span className='Error'>{errors.email.message}</span>)}
          </label>

          <label>
            <p>Phone Number*</p>
            <input inputMode="numeric"
                    pattern="\d*" minLength={11} maxLength={15}
                    type='number' placeholder='Enter phoner number...' 
                    {...register('phoneNumber')}/>
            { errors.phoneNumber && (
              <span className='Error'>{errors.phoneNumber.message}</span>
            )}
          </label>

          <label>
            <p>Password*</p>
            <input  type='password' placeholder='Create password' 
            {...register('password')}/>
            { errors.password && (
              <span className='Error'>{errors.password.message}</span>)}
          </label>

           <label>
            <p>Confirm Password*</p>
            <input 
               type='password' placeholder='Confirm Password'
               {...register('ConfirmPassword')} />
            { errors.ConfirmPassword && (
              <span className='Error'>{errors.ConfirmPassword.message}</span>)}
          </label>

           <label className='Addy'>
            <p>Address*</p>
            <input 
            type='text' placeholder='Adress Line 1'
            {...register('address')} />
          { errors.address && (
              <span className='Error'>{errors.address.message}</span>)}
          </label>

      

          <label>
            <p>Country*</p>
            <select value={country}   
            {...register('country', {
              onChange: () => {
                setValue('state', '');
                setValue('city', '');
              }
            })}>
          <option value=''>Select your country</option>
          {Object.keys(locationData).map((countryName) => (
            <option key={countryName} value={countryName} >{countryName}</option>
          ))}
        </select>
        { errors.country && 
              <span className='Error'>{errors.country.message}</span>}
            {/* <input value={country} onChange={HandleCounty} type='text' placeholder='Enter your country' required/> */}
          </label>
          
          <label>
            <p>Region State*</p>
            <select {...register('state', {
              onChange: () => {
                setValue('city', '');
              }
            })} disabled={!country}>
          <option value=''>Select your state</option>
          {country && Object.keys(locationData[country]?.states || {}).map((stateName) => (
            <option key={stateName} value={stateName}>{stateName}</option>
          ))}
        </select>
        {errors.state &&
              <span className='Error'>{errors.state.message}</span>
        }
            {/* <input value={state} onChange={HandleState} type='text' placeholder='Enter your state' required/> */}
          </label>

          <label>
            <p>City*</p>
            <select {...register('city')}  disabled={!state}>
          <option value=''>Select your city</option>
          {country && state && (locationData[country]?.states[state] || []).map((cityName) => (
            <option key={cityName} value={cityName}>{cityName}</option>
          ))}
        </select>
        {errors.city && (
              <span className='Error'>{errors.city.message}</span>
        )}
          </label>

          <label>
            <p>Post Code*</p>
            <input inputMode="numeric"
                    pattern="\d*" minLength={4} maxLength={6} 
                     type='number' placeholder='Enter post code' 
                    {...register('postCode')}/>
            { errors.postCode && (
              <span className='Error'>{errors.postCode.message}</span>
            )}
          </label>

          </div>
          <ReCAPTCHA
            sitekey="6Lczj2srAAAAAPptpOTiuR8rJPrflh7WF79yATIo"
            onChange={(value: string | null) => setRecaptchaValue(value)}
            className='recaptcha'/>
            {recapErr && (
              <span className='Error'>Please complete the reCAPTCHA</span>
            )}
    {/* <button type='submit'>Register</button> */}

                                    {/* */}
          {!codeSent ? (
            <button type='button' onClick={sendVerificationCode} disabled={!recaptchaValue} >
              Send code
            </button>
          ): (
            <div>

              {Codeloading ? (
                <CakeLoading/>
              ): (
        <label className='Resendcode'>
      <p>Enter Verification Code</p>
      <div className='CodeContainerr'>
      <input
        type="text"
        value={verificationCode}
        onChange={e => setVerificationCode(e.target.value)}
        maxLength={5}
        required
        className='CodeInput'
      />
      <button onClick={resendCode} disabled={resendDisable}>{resendDisable ? `Resend in ${resendCountDown} seconds` : 'Resend'}</button>
    </div>
    </label>

              )}
    <button type='submit'>Register</button>
     {codeError && <span style={{ color: 'red' }}>{codeError}</span>}
            </div>
          )}
          

        </form>
        <p className='LoginText'>Already have an account? 
          <span className='heretoLogin' onClick={() => navigate('/login')}>Login</span></p>
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
