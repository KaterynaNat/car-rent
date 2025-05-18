import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Car, FiltersState } from "../types";

const API = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const fetchBrands = createAsyncThunk<string[]>(
  "cars/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/brands");
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);

export const fetchCars = createAsyncThunk<
  { cars: Car[]; totalPages: number },
  { page: number; filters: FiltersState },
  { rejectValue: string }
>("cars/fetchCars", async ({ page, filters }, thunkAPI) => {
  try {
    const res = await API.get("/cars", {
      params: {
        page,
        limit: 12,
        brand: filters.brand || undefined,
        rentalPrice: filters.rentalPrice || undefined,
        minMileage: filters.minMileage || undefined,
        maxMileage: filters.maxMileage || undefined,
      },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.message) {
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
});

export const fetchCarById = createAsyncThunk<
  Car,
  string,
  { rejectValue: string }
>("cars/fetchCarById", async (id, thunkAPI) => {
  try {
    const res = await API.get(`/cars/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.message) {
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
});
