import { type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./CarCard.module.css";
import type { Car } from "../../redux/types";
import { toggleFavorite } from "../../redux/cars/slice";
import { selectFavorites } from "../../redux/cars/selectors";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface CarCardProps {
  car: Car;
}

const formatMileage = (mileage: number) =>
  mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const CarCard = ({ car }: CarCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const [city] = car.address
    .split(",")
    .map((s) => s.trim())
    .slice(1);

  return (
    <div className={styles.wrapper}>
      <img
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={styles.preview}
      />
      <button
        className={styles.favoriteButton}
        onClick={() => dispatch(toggleFavorite(car))}
        aria-label="Toggle favorite"
      >
        {isFavorite ? (
          <AiFillHeart size={24} color="#3470FF" />
        ) : (
          <AiOutlineHeart size={24} color="rgba(255,255,255,0.7)" />
        )}
      </button>

      <div className={styles.body}>
        <div className={styles.topLine}>
          <h2 className={styles.name}>
            {car.brand}{" "}
            <span className={styles.modelHighlight}>
              {car.model}, {car.year}
            </span>
          </h2>
          <p className={styles.rate}>${car.rentalPrice}</p>
        </div>

        <div className={styles.meta}>
          <p>
            <span className={styles.pin}>{city}</span>
            <span className={styles.dot}>|</span>
            <span className={styles.pin}>{car.rentalCompany}</span>
            <span className={styles.dot}>|</span>
            <span className={styles.pin}>{formatMileage(car.mileage)} km</span>
          </p>
        </div>

        <Link to={`/catalog/${car.id}`} className={styles.actionLink}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
