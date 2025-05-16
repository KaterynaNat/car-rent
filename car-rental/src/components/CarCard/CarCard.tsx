import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./CarCard.module.css";
import type { Car } from "../../redux/types";
import { toggleFavorite } from "../../redux/cars/slice";
import { selectFavorites } from "../../redux/cars/selectors";

interface CarCardProps {
  car: Car;
}

const formatMileage = (mileage: number) =>
  mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const CarCard = ({ car }: CarCardProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((fav) => fav.id === car.id);

  return (
    <div className={styles.card}>
      <img
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={styles.img}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{`${car.brand} ${car.model}, ${car.year}`}</h2>
          <p className={styles.price}>{car.rentalPrice}</p>
        </div>
        <p className={styles.info}>
          {car.address.split(",").slice(1).join(", ")} | {car.rentalCompany} |{" "}
          {formatMileage(car.mileage)} km
        </p>
        <div className={styles.actions}>
          <button
            className={styles.favoriteBtn}
            onClick={() => dispatch(toggleFavorite(car))}
          >
            {isFavorite ? "💔 Remove" : "❤️ Favorite"}
          </button>
          <Link to={`/catalog/${car.id}`} className={styles.detailsBtn}>
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
