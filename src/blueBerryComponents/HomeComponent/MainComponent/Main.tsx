import React, {useState, useEffect} from 'react'
import './Main.css'
import { iVendors } from '../../../types';
import { slides, catIIMG, explorCatList, support, vendorList } from '../../../List'
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ToastContainer } from 'react-toastify'
import { Outlet, useNavigate } from 'react-router-dom'
import CategoryFilter from './CategoryFilter';
import { CountDown } from './CountDown';
import DealofdayProduct from '../../Products/DealofdayProduct';
import Freshfruits from '../../../assets/freshFruits.png'
import TastySnacks from '../../../assets/TastySnaks.png'
import Testimonials from './Testimonials';
import Footer from './Footer';
import ExploreCategories from '../ExploreCategoriesComponent/ExploreCategories';
interface HeaderProps {
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>
}
// import { iProduct } from '../../../types.ts'
const Main =(props: HeaderProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [selectVendor, setSelectVendor] = useState<iVendors>(vendorList[0])
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500); // Transition duration
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const HandleShop = () => {
    navigate('/shop')
  }
    return (
        <div className= 'MainContainer'>
          <div className="Main">
            {/* <div className="MMM"> */}
            <main>
                {slides.map((slide, index) => (
                <div className={`banner ${index === currentSlide ? 'active': ''} 
                      ${isTransitioning ? 'transitioning': ''}`} 
                      key={index}>
                  <div className="BannerContainer">
                <p className="thirdOFF">{slide.Flat}</p>
                <h1 className="Text">{slide.Text} <span className='OtherII'>{slide.OtherII}</span> <br/> <span>{slide.Other}</span></h1>
                <button onClick={HandleShop}>{slide.shop}</button>
                </div>
                
                <div className="BannerIMG">
                  <span>{slide.back}</span>
                  <img src={slide.IMG} className="IMG"/>
                </div>
                </div>
              ))}
            <div className='Pagenation'>
              {slides.map((_, index) => (
                <button key={index} className={`PagenationDash ${index === currentSlide ? 'active' : ''}`} onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setIsTransitioning(false)
                  }, 500)
                }}/>
              ))}
             
            </div>
            </main>
            {/* <div className='Pagenation'>Pagenation</div> */}
              {/* </div> */}
          </div>
          <div  className="ExporeCategories">
            <div className="Box1">
              <img src={catIIMG}/>
            </div>
            <div className="Box2">
              <p>Explore <br/> Categories</p>
            </div>
              <ExploreCategories/>
          </div>

        <div className="DealOfDday">
              <div className="DealOfDdayHeader">
              <div className='DealOfDdayBox1H'>
                <h3>Deal Of The <span>Day</span></h3>
                
                <CountDown initialDays={1} initialHours={12} initialMinutes={30} initialSeconds={0}/>
              </div>
              <p>Don't wait. The time will never be just right.</p>
            </div>
            <div className="DealSwiper">
            <DealofdayProduct/>


        
          </div>

          <div className="DealOfDdayAds">
          <div className="Box1">
          <img src={TastySnacks}/>
          <div className="AdsText">
          <p>Tasty Snack & Fast food</p>
          <p>The flavour of something special</p>
          <button onClick={HandleShop}>Shop Now</button>
          </div>
          </div>
          <div className="Box2">
          <img src={Freshfruits}/>
          <div className="AdsText">
          <p>Fresh Fruits & Vegetables</p>
          <p>A healthy meal for every one</p>
          <button onClick={HandleShop}>Shop Now</button>
          </div>
          </div>
          </div>
          </div>

          <div className="FreshXOrganic">
              <img src={catIIMG}/>
              <div>
                <p>25% off</p>
                <h2>Fresh & Organic <br/> vegetables</h2>
                <button onClick={HandleShop}>Shop Now</button>
              </div>
          </div>

          <div className="NewArrivals">
            <div className="ArrivalHeader">
              <div className='Box1H'>
                <h3>New <span>Arrivals</span></h3>
                
                <CategoryFilter/>
              </div>
              <p>Shop online for new arrivals and get free shipping!</p>
            </div>
            <Outlet/>
          </div>

          <div className="Support">
              {support.map((list) => (
                <div key={list.id} className="SupportBox">
                  <img src={list.IMG} alt={list.Text}/>
                  <div className="SupportText">
                  <p>{list.Text}</p>
                  <p>{list.Discription}</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="TopVendors">
              <div className='VendorsBox'>
                <p>Top <span>Vendor</span></p>
                <p>Discover Our Trusted Partners: Excllence & Reliability in <br/> Every choice</p>
                </div>
              <div className='VendorDetails'>
                
                <div className='Image' 
                style={{backgroundImage: `url(${selectVendor.IMG})`}} >
                  
                  {selectVendor.Logo &&(
                    
                  <div><img src={selectVendor.Logo} alt='vendor logo'/></div>
                  )}
                </div>
               
                <div className='Texts'>
                   {vendorList.map(vendor => (
                  <div key={vendor.id} className={`BBox1 ${selectVendor.id === vendor.id ? 'Active' : ''}`} 
                  onClick={() => setSelectVendor(vendor)}>
                    <div className="BBoxContainer">
                    <p>{vendor.Text}.</p>
                    <p>{vendor.sales}</p>
                    <p> <span>Sales - </span>{vendor.TotalSales}</p>
                    </div>
                  </div>
                ))}
                 
                </div>
              </div>
          </div>

          <div className="Testimonials">
              <Testimonials/>
          </div>

          <footer className="Footer">
              <Footer/>
          </footer>
          <ToastContainer toastStyle={{
            background: 'white'
          }} position='top-right' autoClose={300} style={{zIndex: 999999999999999}}/>
        </div>
  )
}

export default Main
