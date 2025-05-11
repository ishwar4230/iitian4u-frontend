import React from "react";
import "../aspirant/styleAspirant.css";
import scholarIcon from "../data/scholar_icon.png";
import { IconCheck } from "@tabler/icons-react";
    
const ContentCollege = () => {
  const points = [
    "Personalized Counselor for College Selection",
    " College & Branch Selection Assistance",
    "One-on-One Counseling Sessions",
    "JoSAA & CSAB Special Round Guidance",
    "Connect with students of specific streams",
    "Private College Insights & Guidance",
    "Spot Round & Choice Filling Strategies",
    "Real-Time Decision Support",
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

export default ContentCollege;