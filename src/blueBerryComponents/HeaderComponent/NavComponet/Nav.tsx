import React,{useState} from 'react'
import './Nav.css'
import { FaAngleDown } from 'react-icons/fa'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
// type Props = {}
interface HeaderProps {
  isKeywords: boolean;
  setisKeywords: React.Dispatch<React.SetStateAction<boolean>>
}
const Nav = (props: HeaderProps) => {
      const [isLocationDropDown, setIsLocationDropDown] = useState<boolean>(false)
    // const LocaIcon = <FontAwesomeIcon icon={faLocationDot}/>
  return (
      <div className='NavContainer'>
        <div className="NAv">
            <nav className='NNNav'>
                <ul>
                <div className="NavMenue" onClick={() => props.setisKeywords(true)}>
                <div className=" Box Box1"></div>
                <div className=" Box Box2"></div>
                <div className=" Box Box3"></div>
                <div className=" Box Box4"></div>
                </div>
                    <li>Home</li>
                    <li>Categories</li>
                    <li>Products</li>
                    <li>Pages</li>
                    <li>Blog</li>
                    <li>Offers</li>
                </ul>
            </nav>

            
                <div className="SelectLocation">
                    <i className='LocaDot'><FontAwesomeIcon icon={faLocationDot}/></i>
                    <span>United state</span>
                        <i onClick={() => setIsLocationDropDown(!isLocationDropDown)}><FaAngleDown/></i>
                            {isLocationDropDown && (
                            <div className="SelectLocationDropDOwn">
                                    <ul className='qqqqqq'>
                                        <li>United state</li>
                                        <li>Canada</li>
                                        <li>Poland</li>
                                        <li>Argentina</li>
                                        <li>Brazil</li>
                                    </ul>
                            </div>
                            )}
                </div>
        </div>
    </div>
  )
}

export default Nav