import React from "react";
const CheckBox = ({ checkBox, name, formik }) => {
  return (
    <div className="radio-button">
      {checkBox.map((item) => (
        <React.Fragment key={item.value}>
          <label htmlFor={item.value}>{item.label}</label>
          <input
            type="checkbox"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name].includes(item.value)}
          />
        </React.Fragment>
      ))}
      {formik.touched[name] && formik.errors[name] ? (
        <div className="error"> {formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default CheckBox;
