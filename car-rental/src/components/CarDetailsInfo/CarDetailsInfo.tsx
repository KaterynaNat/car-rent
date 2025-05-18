import { type JSX } from "react";
import { SlLocationPin } from "react-icons/sl";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsCalendar2Week, BsCarFront, BsFuelPump } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import type { Car } from "../../redux/types";
import styles from "./CarDetailsInfo.module.css";

interface CarDetailsInfoProps {
  car: Car;
}

export const CarDetailsInfo = ({ car }: CarDetailsInfoProps): JSX.Element => {
  const formatMileage = (mileage: number): string =>
    mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const [city, country] = car.address
    .split(",")
    .map((s) => s.trim())
    .slice(1);

  return (
    <div className={styles.info_rightColumn}>
      <div className={styles.info_wrapper}>
        <h2 className={styles.info_title}>
          {car.brand} {car.model}, {car.year}
        </h2>
        <p className={styles.info_id}>ID: {car.id}</p>

        <div className={styles.info_locationRow}>
          <SlLocationPin className={styles.info_icon} />
          <span>
            {city}, {country}
          </span>
        </div>

        <p className={styles.info_mileage}>
          Mileage: {formatMileage(car.mileage)} km
        </p>

        <p className={styles.info_price}>${car.rentalPrice}</p>
        <p className={styles.info_description}>{car.description}</p>

        <div className={styles.info_sectionsWrapper}>
          <div>
            <h3 className={styles.info_subtitle}>Rental Conditions:</h3>
            <ul>
              {car.rentalConditions.map((condition, index) => (
                <li key={index} className={styles.info_listItem}>
                  <IoIosCheckmarkCircleOutline className={styles.info_icon} />
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.info_subtitle}>Car Specifications:</h3>
            <ul>
              <li className={styles.info_listItem}>
                <BsCalendar2Week className={styles.info_icon} /> Year:{" "}
                {car.year}
              </li>
              <li className={styles.info_listItem}>
                <BsCarFront className={styles.info_icon} /> Type: {car.type}
              </li>
              <li className={styles.info_listItem}>
                <BsFuelPump className={styles.info_icon} /> Fuel Consumption:{" "}
                {car.fuelConsumption}
              </li>
              <li className={styles.info_listItem}>
                <CiSettings className={styles.info_icon} /> Engine Size:{" "}
                {car.engineSize}
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.info_subtitle}>
              Accessories and Functionalities:
            </h3>
            <ul>
              {[...car.accessories, ...car.functionalities].map(
                (item, index) => (
                  <li key={index} className={styles.info_listItem}>
                    <IoIosCheckmarkCircleOutline className={styles.info_icon} />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsInfo;
