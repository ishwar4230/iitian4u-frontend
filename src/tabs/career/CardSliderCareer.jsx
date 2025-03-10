import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
 // Import the CSS file

const cardDataCareer = [
  {
    name: "Coming Soon",
    description: "Hear our success stories. How ordinary students have performed excellently following expert guidance.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Coming soon",
    description: "Hear our success stories. How ordinary students have performed excellently following expert guidance.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Coming soon",
    description: "Hear our success stories. How ordinary students have performed excellently following expert guidance.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Coming soon",
    description: "The mentors at IITians4U really made that difference and took me from 90 percentile to 99 percentile",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  }
];

const CardSliderCareer = () => {
  return (
    <div className="slide-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
      >
        {cardDataCareer.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="card">
              <div className="image-content">
                <div className="overlay"></div>
                <div className="card-image">
                  <img src={card.image} alt={card.name} className="card-img" />
                </div>
              </div>
              <div className="card-content">
                <h3 className="name">{card.name}</h3>
                <p className="description">{card.description}</p>
                <button className="button">Know More</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSliderCareer;