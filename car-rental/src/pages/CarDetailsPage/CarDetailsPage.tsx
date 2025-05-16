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
import styles from "./CarDetails.module.css";
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

  return (
    <div className={styles.container}>
      {isError && <p className={styles.errorText}>Error: {isError}</p>}
      {!car && !isLoading && <p className={styles.errorText}>Car not found</p>}
      {car && (
        <div className={styles.detailsWrapper}>
          <div className={styles.leftSide}>
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className={styles.carImage}
            />
            <RentalForm />
          </div>

          <div className={styles.rightSide}>
            <h2
              className={styles.title}
            >{`${car.brand} ${car.model}, ${car.year}`}</h2>
            <p className={styles.description}>{car.description}</p>

            <ul className={styles.specsList}>
              <li>Type: {car.type}</li>
              <li>Fuel Consumption: {car.fuelConsumption}</li>
              <li>Engine Size: {car.engineSize}</li>
              <li>Rental Price: {car.rentalPrice}</li>
              <li>Mileage: {car.mileage.toLocaleString()} km</li>
              <li>Address: {car.address}</li>
              <li>Rental Company: {car.rentalCompany}</li>
            </ul>

            <h3>Accessories:</h3>
            <ul className={styles.chipList}>
              {car.accessories.map((item, index) => (
                <li key={index} className={styles.chip}>
                  {item}
                </li>
              ))}
            </ul>

            <h3>Functionalities:</h3>
            <ul className={styles.chipList}>
              {car.functionalities.map((item, index) => (
                <li key={index} className={styles.chip}>
                  {item}
                </li>
              ))}
            </ul>

            <h3>Rental Conditions:</h3>
            <ul className={styles.chipList}>
              {car.rentalConditions.map((item, index) => (
                <li key={index} className={styles.chip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;
