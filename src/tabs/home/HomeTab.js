import React,{useState} from 'react'
import HomeTabTopImage from "../data/aspirant-page-top.png";
import "./HomeTabStyle.css" ;
import WhyWeStandOut from "../college/WhyWeStandOut";
import OurServices from "./OurServices";
import faqdatahome from "./faqdatahome.json";

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
      <img className="Top-Image" src={HomeTabTopImage} alt="IITians4U"/>
    <WhyWeStandOut/>
    <OurServices/>
    <h1 className="faqs-heading">Frequently asked</h1>
    <FAQSection/>
    </div>
  )
}

export default HomeTab