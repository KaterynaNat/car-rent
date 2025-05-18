export interface FiltersState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsState {
  cars: Car[];
  currentCar: Car | null;
  favorites: Car[];
  brands: string[];
  filters: FiltersState;
  page: number;
  totalPages: number;
  showFavorites: boolean;
  isLoading: boolean;
  isError: string | null;
  isLoaded: boolean;
}
