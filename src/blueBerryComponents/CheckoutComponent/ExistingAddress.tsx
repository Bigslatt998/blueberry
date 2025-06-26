import { useNavigate } from "react-router-dom"
import { useCart } from '../CartContext';
import Swal from 'sweetalert2';


const ExistingAddress = () => {
  const navigate = useNavigate()
        const {  ClearCart, cart} = useCart();

  const handleProceed =() => {
    if ( cart.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Your cart is empty',
          text: 'Please add items to your cart before proceeding.',
        });
        return;
      };
    ClearCart()
      navigate('/order')
    
  }

  return (
    <div className='AddyContain'>
      <div className='Adddy'>
        <div className="AddydisBox">
                          <p>Name</p>
                          <p>Address</p>
                          <p>Post code</p>
                        </div>
                        <div className="AddydisBox">
                          <p>Taofeeq</p>
                          <p>No 22 ayilara</p>
                          <p>845255</p>
                        </div>
                        <div className="AddydisBox">
                          <p>City</p>
                          <p>State</p>
                          <p>Country</p>
                        </div>
                        <div className="AddydisBox">
                          <p>Ilorin</p>
                          <p>Kwara</p>
                          <p>Nigeria</p>
                        </div>
              
    </div>
<button className='checkout' onClick={handleProceed}>Procced</button>

    </div>
  )
}

export default ExistingAddress