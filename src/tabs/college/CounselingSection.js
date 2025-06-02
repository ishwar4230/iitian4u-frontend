import React from "react";
import "../college/styleCollegeCon.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import CardImage1 from "../data/collegepricecard1.jpeg";
import CardImage2 from "../data/collegepricecard2.jpeg";
import { useMediaQuery } from '@mantine/hooks';


const CounselingSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens
  const navigate = useNavigate();
  return (
    <div className="course-card">
      <div className="course-header">
        {/* <img
          src={SiteLogoImage}
          alt="Site logo"
          className="site-logo"
        /> */}
        <h2>COLLEGE COUNSELING BY IITians & NITians</h2>
        <p className="skills">
          <strong>They have been in uour shoes, Now they'll guide you.</strong>{" "}
          
        </p>
        <div className="rating-section">
          <ul className="counsel-list">
            <li>🏛 Real stories on placements, branches & campus life</li>
            <li>🏛 Personalized advice from top-tier mentors</li>
            <li>🏛 Smarter choices post JEE (JOSAA + CSAB support)</li>
          </ul>
        </div>

        <div className="cta-buttons">
          <Button className="enroll" onClick={() => { navigate("/checkout?course_type=counselling&course_name=counselling&plan_type=end_to_end") }}>Enroll Now</Button>
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