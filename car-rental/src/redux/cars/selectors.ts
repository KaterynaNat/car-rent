import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectCars = (state: RootState) => state.cars.cars;
export const selectCurrentCar = (state: RootState) => state.cars.currentCar;
export const selectFavorites = (state: RootState) => state.cars.favorites;
export const selectBrands = (state: RootState) => state.cars.brands;
export const selectFilters = (state: RootState) => state.cars.filters;
export const selectPage = (state: RootState) => state.cars.page;
export const selectTotalPages = (state: RootState) => state.cars.totalPages;
export const selectShowFavorites = (state: RootState) =>
  state.cars.showFavorites;
export const selectIsLoading = (state: RootState) => state.cars.isLoading;
export const selectIsError = (state: RootState) => state.cars.isError;

export const selectHasMoreCars = createSelector(
  [selectPage, selectTotalPages],
  (page, total) => page < total
);

export const selectVisibleCars = createSelector(
  [selectCars, selectFavorites, selectShowFavorites],
  (cars, favorites, showFavorites) =>
    showFavorites
      ? cars.filter((car) => favorites.some((fav) => fav.id === car.id))
      : cars
);

export const selectIsLoaded = (state: RootState) => state.cars.isLoaded;
