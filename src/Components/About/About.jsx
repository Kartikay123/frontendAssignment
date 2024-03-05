import React from "react";
import "./About.css";
import Card from "../Card/Card";

const About = () => {
  return (
    <div className="about-section">
      
      <Card
        title="About Us"
        content="DeepTek is leveraging cutting edge AI technology to develop an advanced decision support system for radiologists. DeepTek’s solutions are designed to help reduce
         radiologists’ workload and expedite the diagnosis process. Incorporated in the U.S. in 2017, DeepTek has a strong presence in India, which includes partnerships with several hospitals and medical institutes.It is amongst very few Radiology Al companies which have successfully adopted its technology in a commercial mode - creating clear and quantifiable value for patients, hospitals, and radiologists."
      />
    </div>
  );
};

export default About;
