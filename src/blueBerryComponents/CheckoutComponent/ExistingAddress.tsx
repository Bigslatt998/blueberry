import React from 'react'
import { useNavigate } from "react-router-dom"

type Props = {}

const ExistingAddress = () => {
  const navigate = useNavigate()

  const handleProceed =() => {
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