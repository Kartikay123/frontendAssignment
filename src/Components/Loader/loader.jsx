import React from "react";
import { RotatingLines } from "react-loader-spinner";
import './loader.css';

const Loader = () => {
  return (
    <div className="loader-container absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
      <div className="flex items-center justify-center">
        <div className="rounded-full p-2">
          <RotatingLines
            strokeColor="black"
            strokeWidth="3"
            animationDuration="0.75"
            width="56"
            color="black"
            visible={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
