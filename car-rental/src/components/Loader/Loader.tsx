import { type JSX } from "react";
import styles from "./Loader.module.css";

type LoaderProps = {
  loading?: boolean;
};

const Loader = ({ loading = true }: LoaderProps): JSX.Element | null => {
  if (!loading) return null;

  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
