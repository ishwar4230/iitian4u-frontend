import React from "react";
import "./styleAspirant.css";
import scholarIcon from "../data/scholar_icon.png";
import { IconCheck } from "@tabler/icons-react";
    
const ContentAspirant = () => {
  const points = [
    "Personalized Study Plan as per strengths & weaknesses ",
    "Topic-Wise Strategy Mantras to master tough topics",
    "Test Analysis & Attempt Strategy to optimise time",
    "24/7 Doubt-Solving Support from experienced mentors",
    "Stress & Mindset Coaching to handle exam pressure",
    "Learn from real JEE success stories of Mentors",
    "Adaptive Learning Approach - Based on your progress",
    "Last Month’s High-Impact Plan - Structured final push",
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

export default ContentAspirant;