// import React from "react";
// import "./styleCareerCon.css";
// import CareerPlans from "./CareerPlans.json";

// const CareersPricing = () => {

//   return (
//     <section className="Careers-pricing-section">
//     <div className="career-pricing-container">
//       {CareerPlans.map((plan, index) => (
//         <div key={index} className={`careercard ${plan.isHighlighted ? "career-highlighted" : "career"}`}>
//           <h2 className="pricing-plan-name">{plan.name}</h2>
//           <p className="pricing-plan-desc">{plan.description}</p>
//           <hr />
//           <h3 className="pricing-plan-price">{plan.price}</h3>
//           <button className="career-pricing-btn">{plan.buttonText}</button>
//         </div>
//       ))}
//     </div>
//     </section>
    
//   );
// };

// export default CareersPricing;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styleCareerCon.css";
import CareerPlans from "./CareerPlans.json";
import config from "../../Config";

const CareersPricing = () => {
  const [prices, setPrices] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${config.API_PREFIX}/price/get-price?course_type=b_tech`)
      .then(response => {
        const filteredPrices = response.data.prices
          .filter(plan => plan.plan_type !== "one_time")
          .reduce((acc, plan) => {
            acc[plan.plan_type] = plan.price;
            return acc;
          }, {});

        setPrices(filteredPrices);
      })
      .catch(error => console.error("Error fetching prices:", error));
  }, []);

  const handleCheckout = (planType) => {
    navigate(`/checkout?course_type=b_tech&course_name=placement&plan_type=${planType}`);
  };

  return (
    <section className="Careers-pricing-section">
      <div className="career-pricing-container">
        {CareerPlans.map((plan, index) => {
          const planType = plan.name.toLowerCase().includes("monthly")
            ? "monthly"
            : plan.name.toLowerCase().includes("quarterly")
            ? "quarterly"
            : "yearly";

          return (
            <div key={index} className={`careercard ${plan.isHighlighted ? "career-highlighted" : "career"}`}>
              <h2 className="pricing-plan-name">{plan.name}</h2>
              <p className="pricing-plan-desc">{plan.description}</p>
              <hr />
              <h3 className="pricing-plan-price">₹{prices[planType] || "Loading..."}</h3>
              <button className="career-pricing-btn" onClick={() => handleCheckout(planType)}>
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CareersPricing;
