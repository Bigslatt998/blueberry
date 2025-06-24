import React from 'react'
// import './SnackProducts.css'
// import SnacksCard from '../ProductCards/SnacksCard'
import { exportProduct } from '../../List'
import { onQuickView } from '../../List'
import SnacksCard from '../ProductCards/SnacksCard'

// type Props = {}

const SnackProducts =() => {
            const SnackProduct = exportProduct.Snacks
    
    return (
    <div className="ArrivalProduc">
        {SnackProduct?.map((product) =>(
            <SnacksCard key={product.id}   product={product} onQuickView={onQuickView}/>
                        
            ))}
            </div>
  )
}
export default SnackProducts
