import React from 'react'
import NewArrivalCard from '../ProductCards/NewArrivalCard'
import { exportProduct } from '../../List'
import './AllnewProduct.css'
// type Props = {}
import { onQuickView } from '../../List'
export const AllnewProduct = () => {
        const NewArrivalProduct = exportProduct.NewArrival
    
  return (
    <div className="ArrivalProduc">
        {NewArrivalProduct?.map((product) =>(
            <NewArrivalCard key={product.id}   product={product} onQuickView={onQuickView}/>
                    
                  ))}
                </div>
  )
}