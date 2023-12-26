import React from 'react'
import "./Selector.css";

const Selector = ({ label, items, ...selectProps }) => {

  return (
    <label>
      <select
        className="default"
        name="selectedTime"
        {...selectProps}>
        {items}
      </select>
      {label}
    </label>
  );
};

export default Selector;