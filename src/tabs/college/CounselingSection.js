import React from "react";
import "../college/styleCollegeCon.css";
import counselingImage from "../data/scholar_icon.png";
import {Button} from "@mantine/core" ;
import {useNavigate} from "react-router-dom"; 

const CounselingSection = () => {
  const navigate=useNavigate();
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
          <li>🏛 Personalized College Selection: Find the perfect fit for your academic and personal goals.</li>
          <li>🏛 Application Assistance: Get expert help with essays, interviews, and all application materials.</li>
          <li>🏛 Admissions Insights: Understand the nuances of college admissions and stand out from the crowd.</li>
        </ul>
        <Button className="counsel-button" onClick={()=>{navigate("/checkout?course_type=counselling&course_name=counselling&plan_type=life_time")}}>Enroll Now</Button>
      </div>

      {/* Right Side - Image Section */}
      <div className="counsel-image">
        <img src={counselingImage} alt="College Counseling" />
      </div>
    
     
    </div>
  );
};

export default CounselingSection;