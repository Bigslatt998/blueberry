import { explorCatList } from '../../../List'
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

const ExploreCategories = () => {
  return (
    <div className="Box3">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                
                breakpoints={{
                  // Responsive breakpoints
                  320: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 4,
                  }
                }}>
        
                  {explorCatList.map((list) => (
                    <SwiperSlide className="categoryim">
                       <div className="categoryitem">
                        <img src={list.img} alt={list.Text} className="categoryimage" />
                        <p>{list.Text}</p>
                        <p>{list.acc}</p>
                       </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
    </div>
  )
}

export default ExploreCategories