import React, { useState } from 'react'
import "./styleCollegeCon.css";  //HTML of FAQ Accordion
import faqData from "./faqDataCC.json";   //JSON of FAQ questions
import teamMembersCC from "./teamMembersCC.json"; // JSON of Know Your Mentors
import CollegeConLaptopImg from "../data/counselling-page-top-img.png";
import CollegeConMobileImg from "../data/collegeConMobileTopImg.svg";
import CounselingSection from "./CounselingSection";
import Banner from "../banner/Banner";
import TeamSlider from "../../components/TeamSlider";
import { useMediaQuery } from "@mantine/hooks";

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



const CollegeCon = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="aspirant-container">
      <Banner course_type="counselling" course_name="counselling" />
      <img
        className="Top-Image"
        src={isMobile ? CollegeConMobileImg : CollegeConLaptopImg}
        alt="IITians4U"
      />
      <h1 className="kym-heading">Know Your Mentors</h1>
      <TeamSlider teamHome={teamMembersCC} />
      <CounselingSection />
      <h1 className="faqs-heading">Frequently asked</h1>
      <FAQSection />

    </div>
  )
}

export default CollegeCon