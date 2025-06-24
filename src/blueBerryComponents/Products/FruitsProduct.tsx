import React from 'react'
import SnacksCard from '../ProductCards/SnacksCard'
import { exportProduct, onQuickView } from '../../List'
import FruitsCard from '../ProductCards/FruitsCard'

// type Props = {}

export default function FruitsProduct() {
            const FruitProduct = exportProduct.Fruits
    
    return (
    <div className="ArrivalProduc">
        {FruitProduct.map((product) =>(
            <FruitsCard key={product.id}   product={product} onQuickView={onQuickView}/>
                        
            ))}
            </div>
  )
}