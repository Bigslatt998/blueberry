import React from 'react'
import { exportProduct, onQuickView } from '../../../List'
import SnacksCard from '../../ProductCards/SnacksCard'

const SnacksProducts =() => {
   const Snackproducts = exportProduct.Snacks
    return (
      <div className="ShopGrid">
          {Snackproducts?.map((product) =>(
              <SnacksCard key={product.id}   product={product} onQuickView={onQuickView}/>
          ))}
      </div>
    )
}

export default SnacksProducts