import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import CheckBox from "./common/CheckBoxComponent";
import Input from "./common/Input";
import RadioButton from "./common/RadioButton";
import SelectOption from "./common/SelectOption";

const radioOption = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];

const selectOption = [
  { value: "", label: "Select city" },
  { value: "Tehran", label: "Tehran" },
  { value: "Shiraz", label: "Shiraz" },
  { value: "Karaj", label: "Karaj" },
];

const checkBox = [
  { value: "one", label: "Bmw" },
  { value: "two", label: "Porsche" },
];
// 1.
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirmation: "",
  gender: "",
  city: "",
  // initialValue for checkBox should be an empty array
  checked: [],
  termsOfService: false,
};

// 2.
const onSubmit = (values) => {
  axios.post("http://localhost:3001/users", values);
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
  city: Yup.string().required("Select You're city"),
  // validate for checkBox is different
  // .min(1) : it means that at least one checkBox should fill
  checked: Yup.array().min(1).required("one checkBox must be fill").nullable(),
  termsOfService: Yup.boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
});

const SignUp = () => {
  const [formValues, setFormValues] = useState(null);
  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    // this property validate the form upon a component mount and if
    // they will not not valid disable button will active(disabled{!formik.isvalid})
    validateOnMount: true,
    // If the user has already entered the information, it will be loaded
    enableReinitialize: true,
  });
  console.log(formik);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((response) => {
        setFormValues(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="phoneNumber" label="phone Number" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirmation"
          label="password Confirmation"
          type="password"
        />

        <div className="form-control radio">
          <RadioButton
            radioOption={radioOption}
            name="gender"
            formik={formik}
          />
        </div>
        <SelectOption selectOption={selectOption} name="city" formik={formik} />
        <CheckBox checkBox={checkBox} name="checked" formik={formik} />

        <div>
          <label htmlFor="termsOfService">I accept terms and conditions</label>
          <input
            type="checkbox"
            id="termsOfService"
            name="termsOfService"
            value={true}
            onChange={formik.handleChange}
            checked={formik.values.termsOfService}
          />
          {formik.errors.termsOfService && formik.errors.touched ? (
            <div className="error"> {formik.errors.termsOfService}</div>
          ) : null}
        </div>

        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
