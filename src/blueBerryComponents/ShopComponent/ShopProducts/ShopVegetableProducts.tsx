import React from 'react'
import { exportProduct, onQuickView } from '../../../List'
import VegetablesCard from '../../ProductCards/VegetablesCard'
const VegetableProducts = ()  =>{
     const Vegetables = exportProduct.Vegetables
      return (
        <div className="ShopGrid">
            {Vegetables?.map((product) =>(
                <VegetablesCard key={product.id}   product={product} onQuickView={onQuickView}/>
            ))}
        </div>
  )
}

export default VegetableProducts