import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./styleCareerCon.css";
import careerteamCC from "./careerteamCC.json";

const CareerTeamKYM = () => {
    return (
      <div className="team-slider-wrapper">
      <div className="team-slider-container">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          spaceBetween={50} // Adjusted spacing
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 4 },
          }}
          className="team-slider"
        >
          {careerteamCC.map((member, index) => (
            <SwiperSlide key={index} className="team-card">
              <img src={member.image} alt={member.name} className="team-image" />
              <h1 className="team-college">{member.college}</h1>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-description">{member.description}</p>
              <button className="team-button">Learn More</button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons inside the container to position correctly */}
        <div className="swiper-button-prev">&#10094;</div>
        <div className="swiper-button-next">&#10095;</div>
      </div>
    </div>
    );
  };
  
  export default CareerTeamKYM;