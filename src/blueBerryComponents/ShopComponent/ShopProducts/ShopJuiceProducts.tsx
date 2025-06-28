import { exportProduct, onQuickView } from '../../../List'
import JuiceProductCard from '../../ProductCards/JuiceProductCard'
import { useOutletContext } from "react-router-dom";
type ContextType = {
                    isFlexLayOut: boolean;
 };
const JuiceProducts =() => {
  const Juiceproducts = exportProduct.Juice
  const { isFlexLayOut } = useOutletContext<ContextType>();
  
  return (
    <div className={`${isFlexLayOut ? 'ShopFlex' : 'ShopGrid'}`}  >
        {Juiceproducts?.map((product) =>(
            <JuiceProductCard key={product.id}   product={product} 
            onQuickView={onQuickView} isFlexLayOut={isFlexLayOut}/>
        ))}
    </div>
  )
}

export default JuiceProducts