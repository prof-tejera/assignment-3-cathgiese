import "./Input.css";

const Input = ({ placeholder, inputName, inputValue }) => {
  return (
    <input 
      className="Default-input"
      placeholder={placeholder}
      type="tel"
      max="59"
      min="1"
      maxLength="2"
      name={inputName}
      value={inputValue}
      pattern="\d*"
    />
  );
};

export default Input;
