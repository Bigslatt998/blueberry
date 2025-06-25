import NewArrivalCard from '../ProductCards/NewArrivalCard'
import { exportProduct , onQuickView} from '../../List'
import './AllnewProduct.css'
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