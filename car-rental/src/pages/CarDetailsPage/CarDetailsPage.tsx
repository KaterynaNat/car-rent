import { type JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  selectCurrentCar,
  selectIsLoading,
  selectIsError,
} from "../../redux/cars/selectors";
import { fetchCarById } from "../../redux/cars/operations";
import RentalForm from "../../components/RentalForm/RentalForm";
import Loader from "../../components/Loader/Loader";
import CarDetailsInfo from "../../components/CarDetailsInfo/CarDetailsInfo";
import styles from "./CarDetailsPage.module.css";
import type { AppDispatch } from "../../redux/store";

const CarDetailsPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <Loader loading={true} />;
  if (isError) return <p className={styles.errorText}>Error: {isError}</p>;
  if (!car) return <p className={styles.errorText}>Car not found</p>;

  return (
    <div className={styles.container}>
      <div className={styles.detailsWrapper}>
        {/* LEFT SIDE */}
        <div className={styles.leftSide}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={styles.carImage}
          />
          <RentalForm />
        </div>

        {/* RIGHT SIDE - Extracted Component */}
        <CarDetailsInfo car={car} />
      </div>
    </div>
  );
};

export default CarDetailsPage;
