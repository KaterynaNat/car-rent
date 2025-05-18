import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchBrands, fetchCars, fetchCarById } from "./operations";
import type { Car, FiltersState, CarsState } from "../types";

const initialState: CarsState = {
  cars: [],
  currentCar: null,
  favorites: [],
  brands: [],
  filters: {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  },
  page: 1,
  totalPages: 0,
  showFavorites: false,
  isLoading: false,
  isLoaded: false,
  isError: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Car>) => {
      const existing = state.favorites.find((c) => c.id === action.payload.id);
      if (existing) {
        state.favorites = state.favorites.filter(
          (c) => c.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    clearFilters: (state) => {
      state.filters = {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      };
      state.page = 1;
      state.cars = [];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetCars: (state) => {
      state.cars = [];
    },
    toggleFavoritesMode: (state) => {
      state.showFavorites = !state.showFavorites;
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.cars = action.payload.cars;
        } else {
          state.cars = [...state.cars, ...action.payload.cars];
        }
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
        state.isLoaded = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.currentCar = action.payload;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(fetchCars.pending, fetchBrands.pending, fetchCarById.pending),
        (state) => {
          state.isLoading = true;
          state.isError = null;
          state.isLoaded = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCars.rejected,
          fetchBrands.rejected,
          fetchCarById.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isLoaded = true;
          state.isError = action.payload as string;
        }
      );
  },
});

export const {
  toggleFavorite,
  setFilters,
  clearFilters,
  incrementPage,
  setPage,
  resetCars,
  toggleFavoritesMode,
  clearFavorites,
} = carsSlice.actions;

export const carsReducer = carsSlice.reducer;
