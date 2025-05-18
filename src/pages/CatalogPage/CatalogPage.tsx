import { type JSX, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBrands,
  selectFilters,
  selectHasMoreCars,
  selectIsError,
  selectIsLoading,
  selectIsLoaded,
  selectPage,
  selectVisibleCars,
} from "../../redux/cars/selectors";
import { fetchBrands, fetchCars } from "../../redux/cars/operations";
import { incrementPage, resetCars, setPage } from "../../redux/cars/slice";
import Filter from "../../components/CarFilter/CarFilter";
import CarCard from "../../components/CarCard/CarCard";
import Loader from "../../components/Loader/Loader";
import styles from "./CatalogPage.module.css";
import type { AppDispatch } from "../../redux/store";

const CatalogPage = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const cars = useSelector(selectVisibleCars);
  const isLoading = useSelector(selectIsLoading);
  const isLoaded = useSelector(selectIsLoaded);
  const isError = useSelector(selectIsError);
  const hasMore = useSelector(selectHasMoreCars);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const brands = useSelector(selectBrands);

  // Initial fetch
  useEffect(() => {
    if (cars.length === 0 && page === 1 && !isLoading && !isLoaded) {
      dispatch(fetchCars({ page, filters }));
    }
  }, [dispatch, cars.length, page, filters, isLoading, isLoaded]);

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

      {isLoading && cars.length === 0 && <Loader loading={true} />}

      {!isLoading && isError && (
        <p className={styles.error}>Error: {isError}</p>
      )}

      {!isLoading && isLoaded && cars.length === 0 && !isError && (
        <div className={styles.noResults}>
          <p>No results found.</p>
          <p>Please adjust your filters and try again.</p>
        </div>
      )}

      {cars.length > 0 && (
        <>
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

          {isLoading && <Loader loading={true} />}
        </>
      )}
    </section>
  );
};

export default CatalogPage;
