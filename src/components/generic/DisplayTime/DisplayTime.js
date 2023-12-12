import React from "react";
import "./DisplayTime.css";

const Screen = ({ minutes, seconds, displayStyle }) => {
    return (
      <div className={displayStyle}>
        {minutes}m
        {seconds}s
      </div>
    );
  };
  
  export default Screen;
  