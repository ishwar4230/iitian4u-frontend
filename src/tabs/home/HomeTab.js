import React,{useState} from 'react'
import HomeTabTopImage from "../data/homepagetopimage.png";
import "./HomeTabStyle.css" ;
import WhyWeStandOut from "../college/WhyWeStandOut";
import OurServices from "./OurServices";
import faqdatahome from "./faqdatahome.json";
import AboutUs from "./AboutUs";
import CardSlider from "./CardSlider";
import TeamSlider from "./TeamSlider";
import Banner from "../banner/Banner";

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
      {faqdatahome.map((item, index) => (
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


const HomeTab = () => {
  return (
    <div className="hometab-container">
      <Banner course_type="jee" course_name="all"/>
      <img className="Top-Image" src={HomeTabTopImage} alt="IITians4U"/>
      <AboutUs/>
      <OurServices/>
      <h1 className="kym-heading">Know Your Mentors</h1>
      <TeamSlider/>
    <WhyWeStandOut/>
    <div className="Testimonials">
        <h1 className="Testis-heading"> Hear Our Success Stories</h1>
        <CardSlider/>
      </div>
    <h1 className="faqs-heading">Frequently asked</h1>
    <FAQSection/>
    </div>
  )
}

export default HomeTab