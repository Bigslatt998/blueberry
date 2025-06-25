import { exportProduct, onQuickView } from '../../List'
import SnacksCard from '../ProductCards/SnacksCard'


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
