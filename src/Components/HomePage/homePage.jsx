import React from "react";
import "./homePage.css";
import About from "../About/About";
import Vision from "../Vision/Vision";
const HomePage = () => {
  return (
    <div className="homepage-container">
      <About/>
      <Vision/>
    </div>
  )
};

export default HomePage;

// --color-bg: #1f1f38;
//   --color-bg-variant: #2c2c6c;
//   --color-primary: #4db5ff;
//   --color-primary-variant: rgba(77,181,255,0.4);
//   --color-white: #fff;
//   --color-light: rgba(255,255,255,0.6);