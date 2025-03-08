import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AspirantPricing.css";
import config from "../../Config";

const AspirantPricingCards = () => {
  const [priceData, setPriceData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const Aspirantplans = [
    {
      name: "Physics",
      details: ["Concept clarity", "Practice Problems", "Doubt Solving Sessions"],
      course_name: "physics",
    },
    {
      name: "Chemistry",
      details: ["Interactive video lessons", "Conceptual clarity", "Live Q&A sessions"],
      course_name: "chemistry",
    },
    {
      name: "Mathematics",
      details: ["Step-by-step solutions", "Live quizzes & tests", "One-on-one mentoring"],
      course_name: "math",
    },
    {
      name: "All Subjects",
      details: ["Comprehensive syllabus", "Custom study plans", "24/7 mentor support"],
      course_name: "all",
    },
    {
      name: "Strategy",
      details: ["Exam preparation", "Time management tips", "Weekly progress analysis"],
      course_name: "strategy",
    },
  ];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`${config.API_PREFIX}/price/get-price`, {
          params: { course_type: "jee" },
        });

        if (response.data.prices) {
          const formattedPrices = {};
          response.data.prices
            .filter((item) => item.plan_type !== "one_time") // Remove "one_time"
            .forEach((item) => {
              if (!formattedPrices[item.course_name]) {
                formattedPrices[item.course_name] = [];
              }
              formattedPrices[item.course_name].push({
                period: item.plan_type,
                price: item.price,
              });
            });
          setPriceData(formattedPrices);
        }
      } catch (error) {
        console.error("Error fetching price data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Handle navigation to checkout
  const handleCheckout = (courseName, period, price) => {
    navigate(
      `/checkout?course_type=jee&course_name=${courseName}&plan_type=${period}`
    );
  };

  return (
    <section className="aspirant-pricing-section">
      <div className="aspirant-pricing-container">
        {Aspirantplans.map((plan, index) => (
          <div key={index} className="aspirant-card">
            <h2 className="aspirant-title">{plan.name}</h2>
            <ul className="aspirant-details">
              {plan.details.map((detail, i) => (
                <li key={i} className="aspirant-detail-item">✅ {detail}</li>
              ))}
            </ul>
            <hr className="aspirant-divider" />
            {loading ? (
              <p className="aspirant-loading">Loading...</p>
            ) : (
              priceData[plan.course_name]?.map((option, j) => (
                <div key={j} className="aspirant-pricing-option">
                  <span className="aspirant-price">₹{option.price}</span>
                  <button
                    className="aspirant-pricing-btn"
                    onClick={() => handleCheckout(plan.course_name, option.period, option.price)}
                  >
                    Choose {option.period}
                  </button>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AspirantPricingCards;
