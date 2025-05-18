import { type JSX } from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className={styles.link}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
