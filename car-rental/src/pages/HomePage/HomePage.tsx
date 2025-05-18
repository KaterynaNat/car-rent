import { type JSX } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/cars/selectors";

function HomePage(): JSX.Element {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <Loader loading={isLoading} />
      {!isLoading && (
        <div className={styles.container}>
          <h1 className={styles.heading}>Find your perfect rental car</h1>
          <p className={styles.description}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link to="/catalog" className={styles.btn}>
            View Catalog
          </Link>
        </div>
      )}
    </>
  );
}

export default HomePage;
