import React from 'react'
import "./Selector.css";

const Selector = ({ label, numbers, ...selectProps }) => {

  return (
    <label>
      <select
        className="default"
        name="selectedTime"
        {...selectProps}>
        {numbers}
      </select>
      {label}
    </label>
  );
};

export default Selector;