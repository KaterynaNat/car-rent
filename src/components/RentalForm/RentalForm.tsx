import { type JSX } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastFormNotification } from "../ToastFormNotification/ToastFormNotification";
import rentalFormValidationSchema from "../../validationHelpers/rentalFormValidation";
import styles from "./RentalForm.module.css";

interface FormValues {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  bookingDate: null,
  comment: "",
};

const RentalForm = (): JSX.Element => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const formattedData = {
      name: values.name,
      email: values.email,
      bookingDate: values.bookingDate?.toLocaleDateString() || "-",
      comment: values.comment || "-",
    };

    toast.success(
      <ToastFormNotification
        title="Rental request submitted:"
        data={formattedData}
      />,
      {
        duration: 5000,
        style: {
          background: "#3470ff",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          fontSize: "20px",
        },
      }
    );

    resetForm();
  };

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Book your car now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={rentalFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.form}>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={styles.input}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />

            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />

            <DatePicker
              selected={values.bookingDate}
              onChange={(date: Date | null) =>
                setFieldValue("bookingDate", date)
              }
              placeholderText="Booking Date"
              className={styles.input}
              dateFormat="MM/dd/yyyy"
              calendarClassName="custom-datepicker"
              wrapperClassName={styles.dateWrap}
            />
            <ErrorMessage
              name="bookingDate"
              component="div"
              className={styles.error}
            />

            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={styles.textarea}
            />

            <button type="submit" className={styles.submitBtn}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RentalForm;
