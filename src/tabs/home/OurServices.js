import React from "react";
import "./HomeTabStyle.css"; // Import the corresponding CSS file

const OurServices = () => {
  const ourservfeatures = [
    {
      title: "JEE Exam Strategy Mentorship",
      description:
        "Our JEE Exam Strategy Mentorship service is designed to equip aspirants with the right strategies to excel in their exams. Guided by top IITians, students receive personalised study plans that focus on strengthening core concepts and efficient time management. Our mentors share valuable insights from their own experiences, helping students to avoid common pitfalls and maximise their scores.",
    },
    {
      title: "College Selection and Counselling",
      description:
        "Whether you're a JEE aspirant, a student navigating college choices, or planning your career, IITians4U offers personalized guidance tailored to your unique needs. Our flexible mentorship plans ensure that you receive targeted advice and support, helping you make informed decisions at every critical juncture.",
    },
    {
      title: "Internships and Placement Guidance",
      description:
        "Our mentors provide not just academic guidance, but also practical insights on study techniques, internships, and placements. Benefit from real-world advice that prepares you for the challenges ahead and equips you with the skills needed to achieve your career goals.",
    },
  ];

  return (
    <section className="our-services-home">
      <div className="ourservice-container">
        <h2 className="ourservice-section-title">Our Services </h2>
        <div className="ourservice-features-grid">
          {ourservfeatures.map((feature, index) => (
            <div key={index} className="ourservice-feature-card">
              <div className="ourservice-icon-container">
                <span className="ourservice-icon">⬆️</span>
              </div>
              <h3 className="ourservice-feature-title">{feature.title}</h3>
              <p className="ourservice-feature-description">{feature.description}</p>
              <button className="ourservice-button">Know More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;