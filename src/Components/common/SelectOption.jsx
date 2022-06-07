const SelectOption = ({ selectOption, formik, name }) => {
  return (
    <div>
      <label>Select your city</label>
      <select {...formik.getFieldProps(name)} name={name}>
        {selectOption.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="error"> {formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default SelectOption;
