import {useState} from 'react'
import './Shop.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnglesRight as farAngle , faAnglesDown} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Outlet, NavLink, useLocation } from "react-router-dom";
import FlatOffer from '../../blueBerryComponents/HeaderComponent/FlatOfferComponent/FlatOffer';
import Header from '../../blueBerryComponents/HeaderComponent/Header.tsx/Header';
import Nav from '../../blueBerryComponents/HeaderComponent/NavComponet/Nav';
// import Footer from '../../blueBerryComponents/HomeComponent/MainComponent/Footer';
import Footer from '../../blueBerryComponents/HomeComponent/MainComponent/Footer.tsx/Footer';
import Cart from '../../blueBerryComponents/CartComponent/Cart';
import ExploreCategories from '../HomeComponent/ExploreCategoriesComponent/ExploreCategories';
import CheckBox from '../../blueBerryComponents/ShopComponent/CheckBox.tsx'
// type Props = {}

const Shop =() => {
  const [isKeywords, setisKeywords] = useState<boolean>(false)
  const navigate = useNavigate(); 
  const [isCart, setIsCart] = useState<boolean>(false)
  const handleHome = () => {
      navigate('/')
    }
  const location = useLocation();
  const currentPath = location.pathname;

  const isChecked = (category: string) => {
  if (category === 'all') {
    // Snacks is the default (index) route
    return (
      currentPath === '/shop' ||
      currentPath === '/shop/' ||
      currentPath === '/shop/all'
    );
  }
  if (category === 'juice') return currentPath.includes('juiceproducts');
  if (category === 'snack') return currentPath.includes('SnacksProducts');
  if (category === 'vegetable') return currentPath.includes('vegetableProducts');
  if (category === 'fruit') return currentPath.includes('fruitProducts');
  return false;
};
const [price, setPrice] = useState(200); // Default max price
  return (
    <div className="ShopContainer">
        <FlatOffer/>
        <Header isKeywords={isKeywords} setisKeywords={setisKeywords}
          isCart={isCart}           // <-- pass this
          setIsCart={setIsCart}/>
        <Nav isKeywords={isKeywords} setisKeywords={setisKeywords}/>

        <div className="Shop">
          <div className="ShopText">
          <p>Shop</p>

          <ul>
            <li><span onClick={handleHome}>Home</span> <span className='AngleRight'><FontAwesomeIcon icon={farAngle}/></span></li>
            <li className='little'>SHOP</li>
          </ul>
          </div>
        </div>

        <div className="ShContainer">
              <ExploreCategories/>
            <div className="ShopContentContainer">
              <div className="FistContent">
                <div className="CategoriesList">
                <p className="ShopP">Categories</p>
                <ul>
                  <li>
                    <CheckBox checked={isChecked('all')}/>
                    <NavLink to=''>All</NavLink>
                  </li>
                  <li>
                      <CheckBox checked={isChecked('juice')}/>
                    <NavLink to='juiceproducts'>Juice</NavLink>
                  </li>
                  <li>
                      <CheckBox checked={isChecked('snack')}/>
                    <NavLink to='SnacksProducts'>Snack</NavLink>
                  </li>
                  <li>
                    <CheckBox checked={isChecked('vegetable')}/>
                    <NavLink to='vegetableproducts'>Vegetable</NavLink>
                  </li>
                  <li>
                    <CheckBox checked={isChecked('fruit')}/>
                    <NavLink to='fruitProducts'>Fruit</NavLink>
                  </li>
                  {/* <li>
                    <input type='checkbox'/> Snacks
                  </li> */}
                </ul>
                <div className="LoadMore">
                  <a href=''>Load more</a>
                  <a href='' className='AngleRight'><FontAwesomeIcon icon={farAngle}/></a>
                </div>
                </div>
                    <hr/>
                <div className="CategoriesList">
                <p className="ShopP">Weight</p>
                <ul>
                  <li>
                    <CheckBox/>
                    <span>500g</span>
                  </li>
                  <li>
                    <CheckBox/>
                    <span>100ml</span>
                  </li>
                  <li>
                    <CheckBox/>
                    <span>100g</span>
                  </li>
                  <li>
                    <CheckBox/>
                    <span>1 pack</span>
                  </li>
                  {/* <li>
                    <input type='checkbox'/> Snacks
                  </li> */}
                </ul>
                <div className="LoadMoreII">
                  <a href=''>Load more</a>
                  <a href='' className='AngleRight'><FontAwesomeIcon icon={farAngle}/></a>
                </div>
                  <hr/>
                <div className="PriceFilter">
                  <p className="ShopP">Price</p>
                  <div className="PriceDis">
                    $0 - ${price}
                  </div>
                  <input type='range' min='0' max='200' 
                  step='50'
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}/>
                </div>
                </div>
                  <hr/>
                <div className="ShopList">
                <p className="ShopP">Tag</p>
                <ul>
                  <li>
                    Snacks
                  </li>
                  <li>
                   Juice
                  </li>
                  <li>
                    Vegetable
                  </li>
                  <li>
                     Fruits
                  </li>
                </ul>
                </div>
              </div>
              <div className="SecondContent">
                <div className="SeactionHeader">
                  <div className="SeactionBox1">
                    <div className="Seactiongrid">
                      <span className="grid"></span>
                      <span className="grid"></span>
                      <span className="grid"></span>
                      <span className="grid"></span>
                    </div>
                    <div className="Seactionflex">
                      <div className="flex"></div>
                      <div className="flex"></div>
                      <div className="flex"></div>
                    </div>
                  </div>
                  <div className="SeactionBox2">
                    <div className="Sort">
                    <p>Sort by</p>
                    <i><FontAwesomeIcon icon={faAnglesDown}/></i>
                    </div>
                    <div className="SortDropDown">
                      <ul>
                        <li>Sort by</li>
                        <li>Positon</li>
                        <li>Relevance</li>
                        <li>Name, A to Z</li>
                        <li>Name, Z to A</li>
                        <li>Price, High to Low</li>
                        <li>Price, Low to High</li>
                      </ul>
                    </div>
                  </div>

                </div>
                  <section className='productSection'>
                      <Outlet  context={{ price }}/>
                  </section>
              </div>
            </div>
        </div>

        {isCart && (
                <Cart isCart={isCart}         
                setIsCart={setIsCart}/>
            )}
        <Footer/>
    </div>
  )
}

export default Shop