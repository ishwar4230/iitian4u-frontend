import React,{useState} from 'react'
import HomeTabTopImage from "../data/aspirant-page-top.png";
import "./HomeTabStyle.css" ;
import WhyWeStandOut from "../college/WhyWeStandOut";
import OurServices from "./OurServices";
import faqdatahome from "./faqdatahome.json";
import AboutUs from "./AboutUs";
import teamHome from "./teamHome.json";
import CardSlider from "./CardSlider";

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
      {teamHome.map((member, index) => (
        <ContactCard key={index} {...member} />
      ))}
    </div>
  );
};

const HomeTab = () => {
  return (
    <div className="hometab-container">
      <img className="Top-Image" src={HomeTabTopImage} alt="IITians4U"/>
      <AboutUs/>
      <OurServices/>
      <h1 className="kym-heading">Know Your Mentors</h1>
      <ContactSection/>
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