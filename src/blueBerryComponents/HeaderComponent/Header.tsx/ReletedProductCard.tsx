import  { useContext} from 'react'
import './RelatedProductCard.css'
import { FaShoppingCart} from 'react-icons/fa'
import StarRating from '../../HeaderComponent/Header.tsx/Star.tsx'
import { CartContext } from '../../CartContext.tsx'
import { iProduct } from '../../../types.ts'

interface Props {
    product: iProduct;
}

const RelatedProductCard =({product}: Props) => {
      const {addToCart} = useContext(CartContext)
    
    return (
    <div className='RelatedProductCardContainer'>
         <div className="Box">
              <img src={product.img}/>
              <div className='Text'>
                <p>{product.name}</p>
               <StarRating productName={product.name}/>
                <p>${product.price} <del>${product.DelPrice}</del></p>
              </div>
              <button className='Cartt' onClick={() => addToCart(product)}><FaShoppingCart/></button>
            </div>
    </div>
  )
}

export default RelatedProductCard