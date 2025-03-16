import React, { useState } from "react";
import "./styleAspirant.css";
import FAQItem from "./FAQItem";  //HTML of FAQ Accordion
import faqData from "./faqData.json";   //JSON of FAQ questions
import teamAspirant from "./teamAspirant.json" ; // JSON of Know Your Mentors
// import CardSlider from "./CardSlider";
import AspirantTopImage from "../data/aspirant-page-top.svg";
import ContentAspirant from "./ContentAspirant";
import AspirantPricingCards from "./AspirantPricingCards";
import Banner from "../banner/Banner";
import TeamSlider from "../../components/TeamSlider";
//Here the code for FAQ section in FAQitem.js is processed i.e. Integrate Q&A data stored in JSON to FAQItem component
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-section">
      {faqData.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};


// Main Component
const Aspirant = () => {
  return (
    <div className="aspirant-container">
      <Banner course_type="jee" course_name="all"/>
      <img className="Top-Image" src={AspirantTopImage} alt="IITians4U"/>
      <ContentAspirant/>
      <h1 className="kym-heading">Know Your Mentors</h1>
      <TeamSlider teamHome={teamAspirant}/>
      {/* <div className="Testimonials">
        <h1 className="Testis-heading"> Hear Our Success Stories</h1>
        <CardSlider/>
      </div> */}
      <AspirantPricingCards/>
      <h1 className="faqs-heading">Frequently asked</h1>
      <FAQSection />

    </div>
  );
};

export default Aspirant;