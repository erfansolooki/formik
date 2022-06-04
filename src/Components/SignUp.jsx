import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
// 1.
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirmation: "",
  gender: "",
};

const savedData = {
  name: "john",
  email: "erfansolooki20@gmail.com",
  phoneNumber: "09214774323",
  password: "900",
  passwordConfirmation: "900",
  gender: "0",
};

// 2.
const onSubmit = (values) => {
  // console.log(values);
};

// 3.
const validationSchema = Yup.object({
  name: Yup.string()
    .max(8, "Name must be 8 characters or less")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number Name is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password Confirmation is required"),
  gender: Yup.string().required("Select You're gender"),
});

const SignUp = () => {
  const [formValues, setFormValues] = useState(null);
  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    // this property validate the form upon a component mount and if
    // they will not not valid disable button will active(disabled{!formik.isvalid})
    enableReinitialize: true,
    validateOnMount: true,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label>Name</label>
          <input type="text" name="name" {...formik.getFieldProps("name")} />
          {formik.touched.name && formik.errors.name ? (
            <div className="error"> {formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>Email</label>
          <input type="text" name="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? (
            <div className="error"> {formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            {...formik.getFieldProps("phoneNumber")}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="error"> {formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error"> {formik.errors.password}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>password Confirmation</label>
          <input
            type="password"
            name="passwordConfirm"
            {...formik.getFieldProps("passwordConfirmation")}
          />
          {formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation ? (
            <div className="error"> {formik.errors.passwordConfirmation}</div>
          ) : null}
        </div>
        <div className="form-control radio">
          <div className="radio-button">
            <label htmlFor="0">Male</label>
            <input
              type="radio"
              id="0"
              name="gender"
              value="0"
              onChange={formik.handleChange}
              checked={formik.values.gender === "0"}
            />
          </div>
          <div className="radio-button">
            <label htmlFor="1">Female</label>
            <input
              type="radio"
              id="1"
              name="gender"
              value="1"
              onChange={formik.handleChange}
              checked={formik.values.gender === "1"}
            />
          </div>
        </div>
        <button onClick={() => setFormValues(savedData)}>Load Data</button>
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
