import React from 'react'
import "./Button.css";

const Button = ({ color, text, ...btnProps }) => {
  return (
    <button 
      className={color}
      {...btnProps}
    >
      {text}
    </button>
  );
};

export default Button;
