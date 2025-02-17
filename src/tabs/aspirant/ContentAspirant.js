import React from "react";
import "./styleAspirant.css";
import scholarIcon from "../data/scholar_icon.png";
import { IconCheck } from "@tabler/icons-react";
const ContentAspirant = () => {
    return (
      <div className="content-aspirant-top">
         <div className="content-aspirant-left">
            <img className="content-aspirant-image" src={scholarIcon} alt="WhyUS"/>
         </div>
         <div className="content-aspirant-right">
             <h1 className="content-aspirant-right-heading">Why Choose Us ?</h1>
             <div className="aspirant-point">
            <IconCheck size={20} color="green" /> Expert Guidance from Mentors
          </div>
          <div className="aspirant-point">
            <IconCheck size={20} color="green" /> One-On-One Sessions With Experts
          </div>
          <div className="aspirant-point">
            <IconCheck size={20} color="green" /> Constant Feedback and Discussion
          </div>
          <div className="aspirant-point">
            <IconCheck size={20} color="green" /> Plans as per your convenience
          </div>

         </div>
      </div>
    );
  };
  export default ContentAspirant;