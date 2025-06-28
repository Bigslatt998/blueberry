import {useState} from 'react'
import { locationData } from '../../List';
import './NewAddress.css'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import { useCart } from '../CartContext';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../../firebase.config'; 
interface CartProps {
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>
}
const NewAddress = (props: CartProps) => {
  const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postCode, setPostCode] = useState('')
      const navigate = useNavigate()
    

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
     const auth = getAuth();
          const { cart, ClearCart, subtotal, vat, total } = useCart();
      function removeUndefinedFields<T extends object>(obj: T): T {
        return Object.fromEntries(
          Object.entries(obj).filter(([v]) => v !== undefined)
        ) as T;
      }
      const currentUser = auth.currentUser;
        const orderId = Math.floor(1000 + Math.random() * 9000).toString(); 
        const orderData = {
                orderId,
                products: cart.map(item => removeUndefinedFields(item)),
                total,
                status: false,
                createdAt: Timestamp.now(),
                userId: currentUser?.uid || ""
              };

    const handleProceed =  async (e: React.FormEvent) => {
  e.preventDefault();
  if ( cart.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Your cart is empty',
      text: 'Please add items to your cart before proceeding.',
    });
    return;
  };
  if (
    !firstname ||
    !lastname ||
    !phoneNumber ||
    !address ||
    !country ||
    !state ||
    !city ||
    !postCode
  ) {
    Swal.fire({
      icon: 'warning',
      title: 'Please fill all fields',
      text: 'All fields are required.',
    });
    return;
  }
   try {
                await addDoc(collection(db, "orders"), orderData);
                console.log(orderData)
                // ClearCart();
                // navigate(`/order`);
                props.setIsCart(false)
                Swal.fire({
                icon: 'success',
                title: 'Your Order has been placed!',
                text: 'Check order?',
                showCancelButton: true,
                confirmButtonText: 'Go to Checkout',
                cancelButtonText: 'Cancel',
                customClass: {
                  container: 'SwalContainer'
                }
              }).then((result) => {
                if(result.isConfirmed) {
                navigate(`/order`, {
                  state: {
                    subtotal,
                    total,
                    vat,
                    products: cart
                  }
                });
                }
              });
              } catch (error) {
                console.log("Failed to place order", error);
              }
      ClearCart()
        // navigate('/order')
};
  
  return (
     <form className='addyForm'>
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
                <p>Phone Number*</p>
                <input inputMode="numeric"
                        pattern="\d*" minLength={11} maxLength={15}
                        value={phoneNumber} onChange={HandlePhoneNumber} type='number' placeholder='Enter phoner number...' required/>
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
              <button className='NewaddyButt' type='submit'  onClick={handleProceed}>Procceed</button>
    
            </form>
  )
}

export default NewAddress