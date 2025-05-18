import { type JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearFavorites } from "../../redux/cars/slice";
import {
  selectFavorites,
  selectIsLoading,
  selectIsError,
} from "../../redux/cars/selectors";
import CarCard from "../../components/CarCard/CarCard";
import Loader from "../../components/Loader/Loader";
import styles from "./FavoritesPage.module.css";
import type { AppDispatch } from "../../redux/store";

const FavoritesPage = (): JSX.Element => {
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const dispatch: AppDispatch = useDispatch();

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  if (isLoading) {
    return (
      <div className={styles.favoritesContainer}>
        <Loader loading={true} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.favoritesContainer}>
        <p className={styles.favoritesError}>Error: {isError}</p>
      </div>
    );
  }

  return (
    <div className={styles.favoritesContainer}>
      <div className={styles.favoritesHeader}>
        <h2 className={styles.favoritesTitle}>Your Favorite Cars</h2>
        {favorites.length > 0 && (
          <button
            onClick={handleClearFavorites}
            className={styles.clearFavoritesButton}
          >
            Clear Favorites
          </button>
        )}
      </div>
      {favorites.length === 0 ? (
        <p className={styles.noFavorites}>No favorite cars yet.</p>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
