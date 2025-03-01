import React,{useState} from 'react'
import "./styleCareerCon.css";  //HTML of FAQ Accordion
import CareerTopImage from "../data/aspirant-page-top.png";
import faqDatacareer from "./faqDatacareer.json";
import careerteamCC from "./careerteamCC.json";
import CareersPricing from "./CareersPricing";

// FAQ Component
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div>
      <button className={`accordion ${isOpen ? "active" : ""}`} onClick={onClick}>
        {question}
      </button>
      <div className="panel" style={{ display: isOpen ? "block" : "none" }}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-section">
      {faqDatacareer.map((item, index) => (
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
      {careerteamCC.map((member, index) => (
        <ContactCard key={index} {...member} />
      ))}
    </div>
  );
};

const CareerCon = () => {
  return (
    <div className="aspirant-container">
      <img className="Top-Image" src={CareerTopImage} alt="IITians4U"/>
      <h1 className="kym-heading">Know Your Mentors</h1>
      <ContactSection />
      <h1 className="faqs-heading">Frequently asked</h1>
      <FAQSection />
      <h1 className="pricing-heading">Explore Our Plans</h1>
      <CareersPricing/>
    </div>
    
  )
}

export default CareerCon