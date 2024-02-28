import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay,EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const HomeSlider = () => {
  return (
    <div className="container" >
    
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      pagination={{ el: '.swiper-pagination', clickable: true }}
      autoplay={{delay:1000}}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination, Navigation,Autoplay]}
      className="swiper_container"
    >
      <SwiperSlide>
        <img src="https://handydallaireevents.com/wp-content/uploads/2023/03/Handy-Dallaire-5-Events-Nantucket-Wedding-Planning.jpg" alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://handydallaireevents.com/wp-content/uploads/2023/03/Handy-Dallaire-2-Events-Nantucket-Wedding-Planning.jpg" alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://cdn.pixabay.com/photo/2017/08/06/07/16/wedding-2589803_640.jpg" alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://cdn.pixabay.com/photo/2016/11/23/17/56/beach-1854076_640.jpg" alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://cdn.pixabay.com/photo/2017/08/02/01/28/lifestyle-2569540_640.jpg" alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://cdn.pixabay.com/photo/2015/08/24/18/05/cake-905376_640.jpg" alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://adornmentevents.com/wp-content/uploads/ae-gallery-urban-40.jpg" alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://adornmentevents.com/wp-content/uploads/ae-gallery-modern-23.jpg " alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="http://swankeventsboston.com/wp-content/uploads/2024/01/IntelyCare-Grand-Opening-2022-Large-Square.png " alt="slide_image" />
      </SwiperSlide>
      
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <div className="swiper-button-next slider-arrow">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
    
  </div>
  
  )
}

export default HomeSlider