import React from "react";
import {useNavigate} from 'react-router-dom';
import "./BannerStyle.css";
import { useMediaQuery } from "@mantine/hooks";

const Banner = ({course_type, course_name}) => {
    const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens
    const navigate=useNavigate();
    return (
        <div className="whatsapp-banner">
            <div className="whatsapp-text">
                {/* <img src="LInk" alt="WhatsApp Icon" /> */}
                <h3>Take a one time trial call with our IITian mentors now @ ₹49</h3>
            </div>
            <button onClick={() => {navigate(`/checkout?course_type=${course_type}&course_name=${course_name}&plan_type=one_time`)}}  className="join-button">{isMobile?'Book One-Time Trial @ ₹49':'Take Trial'}</button>
        </div>
    );
};
export default Banner;