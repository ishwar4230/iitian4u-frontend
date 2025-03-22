import React,{useState} from 'react'
import "./styleCareerCon.css";  //HTML of FAQ Accordion
import CareerTopImage from "../data/homepagetopimage.png";
import faqDatacareer from "./faqDatacareer.json";
import careerteamCC from "./careerteamCC.json"
import CareersPricing from "./CareersPricing";
// import CardSliderCareer from "./CardSliderCareer";
import Banner from "../banner/Banner";
import TeamSlider from "../../components/TeamSlider";
import ContentCareer from "../career/ContentCareer";


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


const CareerCon = () => {
  return (
    <div className="aspirant-container">
      <Banner course_type="b_tech" course_name="placement"/>
      <img className="Top-Image" src={CareerTopImage} alt="IITians4U"/>
      <ContentCareer/>
      <h1 className="kym-heading">Know Your Mentors</h1>
      <TeamSlider teamHome={careerteamCC}/>
      <h1 className="pricing-heading">Explore Our Plans</h1>
      <CareersPricing/>
      {/* <div className="Testimonials">
        <h1 className="Testis-heading"> Hear Our Success Stories</h1>
        <CardSliderCareer/>
      </div> */}
      <h1 className="faqs-heading">Frequently asked</h1>
      <FAQSection />
      
    </div>
    
  )
}

export default CareerCon;