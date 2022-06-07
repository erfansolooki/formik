import React from "react";
const RadioButton = ({ formik, radioOption, name }) => {
  return (
    <div className="radio-button">
      {radioOption.map((item) => (
        <React.Fragment key={item.value}>
          <label htmlFor={item.value}>{item.label}</label>
          <input
            type="radio"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default RadioButton;
