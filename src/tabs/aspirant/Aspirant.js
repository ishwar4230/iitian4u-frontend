import React, { useState } from "react";
import "./styleAspirant.css";
import FAQItem from "./FAQItem";  //HTML of FAQ Accordion
import faqData from "./faqData.json";   //JSON of FAQ questions
import teamMembers from "./teamMembers.json" ; // JSON of Know Your Mentors
import CardSlider from "./CardSlider";
import AspirantTopImage from "../data/aspirant-page-top.png";
import ContentAspirant from "./ContentAspirant";

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

// Contact Card Component for Know Your Mentors
const ContactCard = ({ name, title, imgSrc }) => {
  return (
    <div className="contact-card">
      <div className="picture">
        <img className="img-fluid" src={imgSrc} alt={name} />
      </div>
      <div className="team-content">
        <h3 className="name">{name}</h3>
        <h4 className="title">{title}</h4>
      </div>
     
    </div>
  );
};
// Mapping JSON to Contact Cards
const ContactSection = () => {
  return (
    <div className="contact-section">
      {teamMembers.map((member, index) => (
        <ContactCard key={index} {...member} />
      ))}
    </div>
  );
};

// Main Component
const Aspirant = () => {
  return (
    <div className="aspirant-container">
      <img className="Top-Image" src={AspirantTopImage} alt="IITians4U"/>
      <ContentAspirant/>
      <h1 className="kym-heading">Know Your Mentors</h1>
      <ContactSection />
      <div className="Testimonials">
        <h1 className="Testis-heading"> Hear Our Success Stories</h1>
        <CardSlider/>
      </div>
      <h1 className="faqs-heading">Frequently asked</h1>
      <FAQSection />
    </div>
  );
};

export default Aspirant;