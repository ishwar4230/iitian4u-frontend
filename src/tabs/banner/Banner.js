import React from "react";
import {useNavigate} from 'react-router-dom';
import "./BannerStyle.css";

const Banner = ({course_type, course_name}) => {
    const navigate=useNavigate();
    return (
        <div class="whatsapp-banner">
            <div class="whatsapp-text">
                {/* <img src="LInk" alt="WhatsApp Icon" /> */}
                <h3>Take a one time trial call with our IITian mentors now @ ₹49</h3>
            </div>
            <button onClick={() => {navigate(`/checkout?course_type=${course_type}&course_name=${course_name}&plan_type=one_time`)}}  class="join-button">Take Trial</button>
        </div>
    );
};
export default Banner;