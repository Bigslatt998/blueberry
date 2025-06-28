import {useState} from 'react'
import { exportProduct, onQuickView } from '../../../List'
import ShopAllProductCard from '../../ProductCards/ShopAllProductCard'
const PRODUCTS_PER_PAGE = 12
type ContextType = { price: number;
                    isFlexLayOut: boolean;
 };
import { useOutletContext } from "react-router-dom";
const ShopAllProduct =() => {
     const Allproducts = exportProduct.Allproducts
    const { price, isFlexLayOut } = useOutletContext<ContextType>();
const filteredProducts = Allproducts.filter(product => product.price <= price)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(Allproducts.length / PRODUCTS_PER_PAGE)
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIdx = startIdx + PRODUCTS_PER_PAGE
  const productsToShow = filteredProducts.slice(startIdx, endIdx)
   const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
 

     return (
      <>
    <div className={`${isFlexLayOut ? 'ShopFlex' : 'ShopGrid'}`}  >
        {productsToShow?.map((product) =>(
            <ShopAllProductCard key={product.id} 
            product={product} onQuickView={onQuickView} isFlexLayOut={isFlexLayOut}/>
        ))}
    </div>
    <div className="ShopPagenation">
    {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => handlePageChange(idx + 1)}
            style={{
              margin: '0 4px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: idx + 1 === currentPage ? '2px solid #2646ad' : '1px solid #ccc',
              background: idx + 1 === currentPage ? '#2646ad' : '#fff',
              color: idx + 1 === currentPage ? '#fff' : '#2646ad',
              cursor: 'pointer',
              fontWeight: idx + 1 === currentPage ? 700 : 400,
            }}
          >
            {idx + 1}
          </button>
        ))}
        </div>
    </>
  )
}

export default ShopAllProduct