import React from "react";
import "../college/styleCollegeCon.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import SiteLogoImage from "../data/logo.svg";
import CardImage1 from "../data/collegepricecard1.jpeg";
import CardImage2 from "../data/collegepricecard2.jpeg";
import { useMediaQuery } from '@mantine/hooks';


const CounselingSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens
  const navigate = useNavigate();
  return (
    <div className="course-card">
      <div className="course-header">
        <img
          src={SiteLogoImage}
          alt="Site logo"
          className="site-logo"
        />
        <h2>Make Smarter College Choices with Expert Guidance</h2>
        <p className="skills">
          <strong>From JOSAA to CSAB - We've got it all covered.</strong>{" "}
          <span>Connect with students from IITs, NITs, BITS and more to explore branches firsthand and make informed, confident choices.</span>
        </p>
        <div className="rating-section">
          <ul className="counsel-list">
            <li>🏛 Personalized College Selection</li>
            <li>🏛 Application Assistance</li>
            <li>🏛 Admissions Insights</li>
          </ul>
        </div>

        <div className="cta-buttons">
          <Button className="enroll" onClick={() => { navigate("/checkout?course_type=counselling&course_name=counselling&plan_type=life_time") }}>Enroll Now</Button>
          <p className="details">Expert Guidance at Just Rs. 499</p>
        </div>
      </div>

      <div className="image-row">
        <img
          src={CardImage1}
          alt="Course1"
          className="course-img"
        />
        {!isMobile &&<img
          src={CardImage2}
          alt="Course2"
          className="course-img"
        />}
      </div>
    </div>
  );
};

export default CounselingSection;