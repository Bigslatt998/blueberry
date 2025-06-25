import './Testimonials.css'
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { TestimonialsList } from '../../../List';
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
const Testimonials = () => {

  
  return (
    <div className='TestimonialsContainer'>
        <Swiper
                modules={[EffectCoverflow]}
                effect='coverflow'
                speed={800}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 10,
                  depth: 50,
                  modifier: 1,
                  slideShadows: false
                }}
                spaceBetween={300}
                slidesPerView={1}
                loop={true}
                // autoplay={{
                //   delay: 3000,
                //   disableOnInteraction: false,
                // }}
                
              >
                <div className="PPPPP">
                  Testimonials
                </div>
                 {TestimonialsList.map(list => (
                    <SwiperSlide>
                      <div className="TesiIMG">
                      <img src={list.IMG} alt={list.Name}/>
                      </div>
                      <div className="TesiText">
                        <p>{list.Name}</p>
                        <p>({list.Post})</p>
                        <p>"{list.Discription}"</p>

                      </div>
                    </SwiperSlide>
                 ))}
                </Swiper>
 
                
    </div>

  )
}

export default Testimonials;


