import { type JSX } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBrands,
  selectFilters,
  selectHasMoreCars,
  selectIsError,
  selectIsLoading,
  selectPage,
  selectVisibleCars,
} from "../../redux/cars/selectors";
import { fetchBrands, fetchCars } from "../../redux/cars/operations";
import { incrementPage, resetCars, setPage } from "../../redux/cars/slice";
import Filter from "../../components/CarFilter/CarFilter";
import CarCard from "../../components/CarCard/CarCard";
import styles from "./CatalogPage.module.css";
import type { AppDispatch } from "../../redux/store";

const CatalogPage = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const cars = useSelector(selectVisibleCars);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const hasMore = useSelector(selectHasMoreCars);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const brands = useSelector(selectBrands);

  useEffect(() => {
    if (cars.length === 0 && page === 1) {
      dispatch(fetchCars({ page, filters }));
    }
  }, [dispatch, cars, page, filters]);

  useEffect(() => {
    if (!brands.length) {
      dispatch(fetchBrands());
    }
  }, [dispatch, brands]);

  const handleSearch = () => {
    dispatch(resetCars());
    dispatch(setPage(1));
    dispatch(fetchCars({ page: 1, filters }));
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchCars({ page: page + 1, filters }));
  };

  return (
    <section className={styles.container}>
      <div className={styles.filterContainer}>
        <Filter onSearch={handleSearch} />
      </div>

      {cars.length === 0 && !isLoading && (
        <div className={styles.noResults}>
          <p>No results found.</p>
          <p>Please adjust your filters and try again.</p>
        </div>
      )}

      {isError && <p className={styles.error}>Error: {isError}</p>}

      <div className={styles.gridContainer}>
        <ul className={styles.grid}>
          {cars.map((car) => (
            <li key={car.id}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      </div>

      {hasMore && !isLoading && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </section>
  );
};

export default CatalogPage;
