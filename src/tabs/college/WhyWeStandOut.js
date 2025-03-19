import React from "react";
import "./styleCollegeCon.css"; // Import the corresponding CSS file
import personalisedImage from "../data/personalised_guidance.png";
import mentorshipImage from "../data/mentorship_guidance.png";
import packageImage from "../data/all_in_one.png";
const WhyWeStandOut = () => {
  const features = [
    {
      title: "Expert Mentorship from IITians",
      description:
        "Success in JEE and beyond requires the right guidance. Our mentors, who have been through the same journey, bring their first-hand experience, proven strategies, and insider tips to help you excel. From mastering tough concepts to handling pressure like a pro, we ensure you get the best mentorship straight from IITians who have cracked it themselves.",
      image: mentorshipImage,
    },
    {
      title: "Personalized Guidance – Solutions Tailored Just for You",
      description:
        "Every student has unique challenges, and we are here to solve them. Whether it’s overcoming weak topics, building confidence, managing stress, or choosing the right career path, we provide one-on-one mentorship to tackle your specific dilemmas. No generic advice, just customized solutions designed to help you succeed in your own way.",
      image:personalisedImage,
    },
    {
      title: "All-in-One Package – Your Complete Roadmap to Success",
      description:
      "From JEE exam prep to test-taking strategies, college counseling, and career mentorship, we cover it all under one roof. No need to juggle between multiple platforms—our experts guide you at every step, from cracking JEE to securing your dream job. Wherever you are in your journey, we have the right support system for you.",
      image:packageImage,
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
                <img src={feature.image} alt="why-so-image" className="whywso-icon"/>
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