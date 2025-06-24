import React from 'react'
import './DealoddayProduct.css'
import { exportProduct } from '../../List'
import { onQuickView } from '../../List'
import FruitsCard from '../ProductCards/FruitsCard'
import DealofdayCard from '../ProductCards/DealofdayCard'
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
// type Props = {}

export default function DealofdayProduct() {
            const DealProduct = exportProduct.DealofDay
    
    return (
    <div className="DealProduct">
        <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                // loop={true}
                // autoplay={{
                //   delay: 3000,
                //   disableOnInteraction: false,
                // }}
                
                breakpoints={{
                  // Responsive breakpoints
                  
                  480: {
                    slidesPerView: 2,
                  },
                  800: {
                    slidesPerView: 3,
                  },
                  1250: {
                    slidesPerView: 4,
                  }
                }}>

                 {DealProduct?.map((product) =>(
                    <SwiperSlide>
                    <DealofdayCard key={product.id}   product={product} onQuickView={onQuickView}/>
                    </SwiperSlide>
            ))}
                </Swiper>
       
            </div>
  )
}