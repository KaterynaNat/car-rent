import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./RentalForm.module.css";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
});

const RentalForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", phone: "" }}
      validationSchema={validationSchema}
      onSubmit={(_, { resetForm }) => {
        toast.success("Booking successful!");
        resetForm();
      }}
    >
      <Form className={styles.form}>
        <label>
          Name
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </label>

        <label>
          Email
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" className={styles.error} />
        </label>

        <label>
          Phone
          <Field name="phone" type="tel" />
          <ErrorMessage name="phone" component="div" className={styles.error} />
        </label>

        <button type="submit" className={styles.submitBtn}>
          Rent now
        </button>
      </Form>
    </Formik>
  );
};

export default RentalForm;
