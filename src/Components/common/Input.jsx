const Input = ({ formik, name, label, type = "text" }) => {
  return (
    <div className="form-control">
      <label>{label}</label>
      <input type={type} name={name} {...formik.getFieldProps(name)} />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="error"> {formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default Input;
