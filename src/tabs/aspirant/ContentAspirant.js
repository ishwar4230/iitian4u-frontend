import React from "react";
import "./styleAspirant.css";
import scholarIcon from "../data/scholar_icon.png";
import { IconCheck } from "@tabler/icons-react";
    
const ContentAspirant = () => {
  const points = [
    "Personalized Study Plan – A roadmap tailored to your strengths and target score.",
    "Topic-Wise Strategy Mantras – Proven techniques from IITians to master tough topics.",
    "Test Analysis & Attempt Strategy – Optimize accuracy and time management.",
    "24/7 Doubt-Solving Support – Get instant help from experienced mentors.",
    "Stress & Mindset Coaching – Stay motivated and handle exam pressure effectively.",
    "Mentor Experience Sharing – Learn from real JEE success stories.",
    "Adaptive Learning Approach – Flexible mentorship based on your progress.",
    "Last Month’s High-Impact Plan – Structured revision for the final push.",
    "Exam-Day Blueprint – Smart strategies for time and question selection."
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