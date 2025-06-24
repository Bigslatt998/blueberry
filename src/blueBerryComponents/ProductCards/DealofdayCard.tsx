import React, {useState, useContext} from 'react'
// import './FruitsCard.css'
import { CartContext } from '../CartContext.tsx'
import { iProduct } from '../../types.ts'
import StarRating from '../HeaderComponent/Header.tsx/Star.tsx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart, faEye } from '@fortawesome/free-regular-svg-icons'
import {faShoppingBag, faHeart as farHeart } from '@fortawesome/free-solid-svg-icons'
import { useWishlist } from '../FavoriteContect.tsx' 
interface Props {
    product: iProduct;
    onQuickView: (product: iProduct) => void;
}
// interface Product{
//     id:number;
//     name: string;
//     price?: number;
//     DelPrice?: number;
//     img?: string;
//     rating?: number
// }

const DealofdayCard =({product, onQuickView}: Props) => {
    const {addToCart} =useContext(CartContext)
    const {isInWishlist, toggleWishlist} = useWishlist()
    const isWishlist = isInWishlist(product.name)
    const HandleWishlist = () => {
        toggleWishlist(product)
        console.log(product)
    }
    return (
    <div className='NewArrivalCardCardContainer'>
        <div className="Box">
        <div className="IMG">
            <img src={product.img}/>
            <ul>
                <button title='Like' onClick={ HandleWishlist} style={{color: isWishlist ? '#718ff1' : ''}}><FontAwesomeIcon icon={isWishlist ? farHeart : faHeart}/></button>
                <button title='View' onClick={() => onQuickView(product)}><FontAwesomeIcon icon={faEye}/></button>
                {/* <li><FontAwesomeIcon icon={faRepeat}/></li> */}
                <button title='Cart' onClick={() => addToCart(product)}><FontAwesomeIcon icon={faShoppingBag}/></button>
            </ul>
        </div>
        <div className="ProductDails">
            <div className="BOx1">
                <p>{product.type}</p>
                <StarRating productName={product.name}/>
            </div>
            <div className="BOx2">
                <p>{product.name}</p>
                <p>${product.price} <del>${product.DelPrice}</del></p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default DealofdayCard