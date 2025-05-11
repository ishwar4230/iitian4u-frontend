import React from "react";
import "../college/styleCollegeCon.css";
import counselingImage from "../data/scholar_icon.png";
import {Button} from "@mantine/core" ;
import {useNavigate} from "react-router-dom"; 
import { useMediaQuery } from "@mantine/hooks";

const CounselingSection = () => {
  const navigate=useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="counsel-container">
      {/* Left Side - Text Section */}
      <div className="counsel-text">
        <h1>
          Navigate Your <em>College Journey</em> with Confidence
        </h1>
        <p>
          Our college counseling services at IITians4u provide expert guidance through the complex 
          college selection and application process. We ensure you make informed decisions, aligning your 
          aspirations with the best educational opportunities. Let us help you unlock your potential and 
          achieve your academic dreams.
        </p>

        <ul className="counsel-list">
          <li>🏛 Personalized College Selection</li>
          <li>🏛 Application Assistance</li>
          <li>🏛 Admissions Insights</li>
        </ul>
        <Button className="counsel-button" onClick={()=>{navigate("/checkout?course_type=counselling&course_name=counselling&plan_type=life_time")}}>Enroll Now</Button>
      </div>

      {!isMobile && (
        <div className="counsel-image">
          <img src={counselingImage} alt="College Counseling" />
        </div>
      )}
    
     
    </div>
  );
};

export default CounselingSection;