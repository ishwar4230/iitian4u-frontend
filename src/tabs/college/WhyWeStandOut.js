import React from "react";
import "./styleCollegeCon.css"; // Import the corresponding CSS file

const WhyWeStandOut = () => {
  const features = [
    {
      title: "Expert Mentorship from IITians",
      description:
        "At IITians4U, gain exclusive access to the knowledge and expertise of IIT graduates. Our mentors have successfully navigated the challenges of the JEE and beyond, and are here to share their proven strategies and insights to guide you at every step of your academic journey.",
    },
    {
      title: "Tailored Guidance for Every Stage",
      description:
        "Whether you're a JEE aspirant, a student navigating college choices, or planning your career, IITians4U offers personalized guidance tailored to your unique needs. Our flexible mentorship plans ensure that you receive targeted advice and support, helping you make informed decisions at every critical juncture.",
    },
    {
      title: "Real-World Advice for Success",
      description:
        "Our mentors provide not just academic guidance, but also practical insights on study techniques, internships, and placements. Benefit from real-world advice that prepares you for the challenges ahead and equips you with the skills needed to achieve your career goals.",
    },
  ];

  return (
    <section className="why-we-stand-out">
      <div className="whywso-container">
        <h2 className="whywso-section-title">Why we stand out </h2>
        <div className="whywso-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="whywso-feature-card">
              <div className="whywso-icon-container">
                <span className="whywso-icon">⬆️</span>
              </div>
              <h3 className="whywso-feature-title">{feature.title}</h3>
              <p className="whywso-feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWeStandOut;