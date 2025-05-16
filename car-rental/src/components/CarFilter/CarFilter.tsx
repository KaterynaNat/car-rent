import { useDispatch, useSelector } from "react-redux";
import styles from "./CarFilter.module.css";
import { selectBrands, selectFilters } from "../../redux/cars/selectors";
import { setFilters } from "../../redux/cars/slice";

interface FilterProps {
  onSearch: () => void;
}

const CarFilter = ({ onSearch }: FilterProps) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(setFilters({ [e.target.name]: e.target.value }));
  };

  return (
    <div className={styles.filter}>
      <select
        name="brand"
        value={filters.brand}
        onChange={handleChange}
        className={styles.input}
      >
        <option value="">Brand</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="rentalPrice"
        value={filters.rentalPrice}
        placeholder="Price up to $"
        onChange={handleChange}
        className={styles.input}
      />

      <input
        type="text"
        name="minMileage"
        value={filters.minMileage}
        placeholder="Min mileage"
        onChange={handleChange}
        className={styles.input}
      />

      <input
        type="text"
        name="maxMileage"
        value={filters.maxMileage}
        placeholder="Max mileage"
        onChange={handleChange}
        className={styles.input}
      />

      <button onClick={onSearch} className={styles.searchBtn}>
        Search
      </button>
    </div>
  );
};

export default CarFilter;
