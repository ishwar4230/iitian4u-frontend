import React from "react";
import "./HomeTabStyle.css";
import scholarIcon from "../data/scholar_icon.png";
const AboutUs = () => {
    return (
      <div className="content-home-top">
         <div className="content-home-left">
            <img className="content-home-image" src={scholarIcon} alt="WhyUS"/>
         </div>
         <div className="content-home-right">
             <h1 className="content-home-right-heading">About Us </h1>
             <p className="home-point">
                We are a team of IITians who want to help you navigate through your academic journey,
                be it through competitive exams JEE/ NEET or counselling or Career. We got you covered
             </p>
         </div>
      </div>
    );
  };
  export default AboutUs;