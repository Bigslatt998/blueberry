import React from 'react'
import { exportProduct, onQuickView } from '../../../List'
import JuiceProductCard from '../../ProductCards/JuiceProductCard'

const JuiceProducts =() => {
  const Juiceproducts = exportProduct.Juice
  return (
    <div className="ShopGrid">
        {Juiceproducts.map((product) =>(
            <JuiceProductCard key={product.id}   product={product} onQuickView={onQuickView}/>
        ))}
    </div>
  )
}

export default JuiceProducts