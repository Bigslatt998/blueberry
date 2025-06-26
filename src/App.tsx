import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './blueBerryComponents/HomeComponent/Home'
import { AllnewProduct } from './blueBerryComponents/Products/AllnewProduct.tsx'
import SnackProducts from './blueBerryComponents/Products/SnackProducts.tsx'
import FruitsProduct from './blueBerryComponents/Products/FruitsProduct.tsx'
import VegetablesProducts from './blueBerryComponents/Products/VegetablesProduct.tsx'
import { Register } from './blueBerryComponents/RegisterComponent/Registercopy.tsx'
import { Login } from './blueBerryComponents/LoginComponent/Login.tsx'
import { Profile } from './blueBerryComponents/ProfileComponent/Profile.tsx'
import Wishlist from './blueBerryComponents/WishlistComponent/Wishlist'
import Shop from './blueBerryComponents/ShopComponent/Shop.tsx'
import SnacksProducts from './blueBerryComponents/ShopComponent/ShopProducts/ShopSnacksProducts.tsx'
import FruitsProducts from './blueBerryComponents/ShopComponent/ShopProducts/ShopFruitsProducts.tsx'
import JuiceProducts from './blueBerryComponents/ShopComponent/ShopProducts/ShopJuiceProducts.tsx'
import VegetableProducts from './blueBerryComponents/ShopComponent/ShopProducts/ShopVegetableProducts.tsx'
import ShopAllProduct from './blueBerryComponents/ShopComponent/ShopProducts/ShopAllProduct.tsx'
import { CartPage } from './blueBerryComponents/CartPage/CartPage.tsx'
import { Checkout } from './blueBerryComponents/CheckoutComponent/Checkout.tsx'
import { TrackOrder } from './blueBerryComponents/TrackOrder/TrackOrder.tsx'
import ExistingAddress from './blueBerryComponents/CheckoutComponent/ExistingAddress.tsx'
import NewAddress from './blueBerryComponents/CheckoutComponent/NewAddress.tsx'
import { OrderDetails } from './blueBerryComponents/TrackOrder/OrderDetails.tsx'
function App() {

  return (
     <div className="BodyContainer">
          <Routes>
            <Route path='/' element={<Home/>} >
              <Route index element={<AllnewProduct/>}></Route>
              <Route path='snacks&spice' element={<SnackProducts/>}></Route>
              <Route path='fruit' element={<FruitsProduct/>}></Route>
              <Route path='vegetable' element={<VegetablesProducts/>}></Route>
            </Route>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/wishlist' element={<Wishlist/>}/>
            <Route path='/shop' element={<Shop/>}>
              <Route index element={<ShopAllProduct/>}/>
              <Route path='fruitproducts' element={<FruitsProducts/>}/>
              <Route path='SnacksProducts' element={<SnacksProducts/>}/>
              <Route path='juiceProducts' element={<JuiceProducts/>}/>
              <Route path='vegetableProducts' element={<VegetableProducts/>}/>
            </Route>
            <Route path='/Cartpage' element={<CartPage/>}/>
            <Route path='/Checkout' element={<Checkout/>}>
                <Route index element={<ExistingAddress/>}/>
                <Route path='newaddress' element={<NewAddress/>}/>
            </Route>
            <Route path='/order' element={<TrackOrder/>}/>
            <Route path="/order/:orderId" element={<OrderDetails />} />

          </Routes>
     </div>
  )
}

export default App
