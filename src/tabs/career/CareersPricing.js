import React from "react";
import "./styleCareerCon.css";
import CareerPlans from "./CareerPlans.json";

const CareersPricing = () => {

  return (
    <section className="Careers-pricing-section">
    <div className="career-pricing-container">
      {CareerPlans.map((plan, index) => (
        <div key={index} className={`careercard ${plan.isHighlighted ? "career-highlighted" : "career"}`}>
          <h2 className="pricing-plan-name">{plan.name}</h2>
          <p className="pricing-plan-desc">{plan.description}</p>
          <hr />
          <h3 className="pricing-plan-price">{plan.price}</h3>
          <button className="career-pricing-btn">{plan.buttonText}</button>
        </div>
      ))}
    </div>
    </section>
    
  );
};

export default CareersPricing;