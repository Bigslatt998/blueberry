import React from 'react'
import { exportProduct, onQuickView } from '../../../List'
import FruitsCard from '../../ProductCards/FruitsCard'


const FruitsProducts = () => {
              const FruitProduct = exportProduct.Fruits
  
  return (
     <div className="ShopGrid">
            {FruitProduct.map((product) =>(
                <FruitsCard key={product.id}   product={product} onQuickView={onQuickView}/>
                            
                ))}
                </div>
  )
}

export default FruitsProducts