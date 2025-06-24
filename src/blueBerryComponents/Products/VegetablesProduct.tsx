// import './SnackProducts.css'
import { exportProduct } from '../../List'
import { onQuickView } from '../../List'
import VegetablesCard from '../ProductCards/VegetablesCard'

// type Props = {}

export default function VegetablesProducts() {
            const VegetableProduct = exportProduct.Vegetables
    
    return (
    <div className="ArrivalProduc">
        {VegetableProduct?.map((product) =>(
            <VegetablesCard key={product.id}   product={product} onQuickView={onQuickView}/>
                        
            ))}
            </div>
  )
}