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
             At IITians4u, we are a team of IITians committed to guiding JEE aspirants, 
             engineering students, and college applicants at every stage. From strategic JEE 
             preparation and personalized JoSAA counselling to career mentorship in specialized domains, 
             we provide expert support to help you make informed decisions. Whether you’re striving for a
              top JEE rank, selecting the right college, or shaping your career, we’ve been there and we’re here 
              to help you succeed.
             </p>
         </div>
      </div>
    );
  };
  export default AboutUs;