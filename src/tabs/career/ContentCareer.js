import React from "react";
import "../aspirant/styleAspirant.css";
import scholarIcon from "../data/scholar_icon.png";
import { IconCheck } from "@tabler/icons-react";
    
const ContentCareer = () => {
  const points = [
    "Personalized Career Roadmap",
    " 1-on-1 Mentorship with Industry Experts",
    "CV Building & Resume Review",
    "Mock Interviews & Placement Prep",
    " Off-Campus & On-Campus Internship Guidance",
    "Higher Studies & Scholarship Assistance",
    "Project & Hackathon Strategies",
    " Exclusive Networking & Career Growth Sessions",
  ];

  return (
    <div className="content-aspirant-top">
      <div className="content-aspirant-left">
        <img className="content-aspirant-image" src={scholarIcon} alt="Why Choose Us" />
      </div>
      <div className="content-aspirant-right">
        <h1 className="content-aspirant-right-heading">Why Choose Us?</h1>
        <div className="aspirant-points-container">
          {points.map((point, index) => (
            <div key={index} className="aspirant-point">
              <IconCheck size={20} color="green" className="check-icon" />
              {point}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCareer;