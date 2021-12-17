import * as yup from "yup";

export const userSchema = yup.object().shape({
  firstName: yup.string().min(2, "Too Short!!!").required("Required!!!"),
  lastName: yup.string().min(2, "Too Short!!!").required("Required!!!"),
  email: yup.string().email("Enter a valid Email!!").required("Required!!!"),
  addr1: yup.string().required("Required!!!"),
  add2: yup.string(),
  city: yup.string().required("Required!!!"),
  state: yup.string().required("Required!!!"),
  zip: yup
    .number()
    .positive()
    .integer()
    .min(6, "Enter a Valid Zip Code!!")
    .required("Required!!!"),
  accountType: yup.string().required("Required!!!"),
  gender: yup.string().required(),
});
