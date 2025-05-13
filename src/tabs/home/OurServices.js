import React from "react";
import "./HomeTabStyle.css"; // Import the corresponding CSS file
import {Button} from "@mantine/core" ;
import {useNavigate} from "react-router-dom";
import ourserv1 from "../data/ourserv_icon1.jpeg";
import ourserv2 from "../data/ourserv_icon2.png";
import ourserv3 from "../data/ourserv_icon3.png";

const OurServices = () => {
  const navigate=useNavigate();
  
  const ourservfeatures = [
    {
      title: "JEE Expert Mentor – Learn from the Best to Ace JEE",
      description:
        "Cracking JEE is not just about hard work; it’s about working smart! Our mentors will help you with topic-wise strategy mantras to maximize your score, a personalized study plan tailored to your strengths, and stress management techniques to keep you focused. From test analysis to refining your attempt strategy, we ensure you learn from the experience of top scorers. Are you ready to ace JEE with us?",
      route:"/aspirant",
      image:ourserv1,
    },
    {
      title: "Personal Counselor – Make the Right College and Branch Choice",
      description:
        "Many students regret their college or branch choice after joining. The reason? Lack of guidance during counseling. We solve this by connecting you with seniors from your target colleges, offering an end-to-end counseling plan that aligns with your interests, and providing college and branch predictions. Whether it’s state government, private college counseling, or spot choice filling, we ensure you make informed decisions. Let’s secure your dream college together!",
        route:"/college",
        image:ourserv2,
    },
    {
      title: "Career Buddy – Your Guide from College to a Dream Career",
      description:
        " A great JEE rank doesn’t guarantee a great career. Many students struggle in college due to a lack of resources and mentorship. We bridge this gap by guiding you in CV building, mock interviews, off-campus internships, and on-campus placements. From hackathons to real-world projects, our domain experts will help you prepare for your dream role. Think of us as your guide, coach, and constant support in this journey!",
        route:"/career",
        image:ourserv3,
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
                
                <img src={feature.image} alt="ourservices-image" className="ourservice-icon"/>
              </div>
              <h3 className="ourservice-feature-title">{feature.title}</h3>
              <p className="ourservice-feature-description">{feature.description}</p>
              <Button w="8rem" className="ourservice-button" onClick={()=>{navigate(feature.route)}}>Know More</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;