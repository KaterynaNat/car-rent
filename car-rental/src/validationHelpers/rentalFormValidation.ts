import * as Yup from "yup";

const rentalFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bookingDate: Yup.date().nullable(),
  comment: Yup.string(),
});

export default rentalFormValidationSchema;
