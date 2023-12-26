import React from "react";
import "./Input.css";

const Input = ({ inputName, inputValue, ...inputProps }) => {
  return (
    <input 
      className="Default-input"
      placeholder="Description (optional)"
      // name={inputName}
      // value={inputValue}
      {...inputProps}
    />
  );
};

export default Input;
