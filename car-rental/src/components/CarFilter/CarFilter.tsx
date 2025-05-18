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
    <form className={styles.panel} onSubmit={(e) => e.preventDefault()}>
      <label className={styles.group}>
        Car brand
        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Choose a brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.group}>
        Price/ 1 hour
        <select
          name="rentalPrice"
          value={filters.rentalPrice}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Choose a price</option>
          <option value="10">Up to $10</option>
          <option value="20">Up to $20</option>
          <option value="30">Up to $30</option>
        </select>
      </label>

      <label className={styles.group}>
        Car mileage / km
        <div className={styles.mileageBox}>
          <input
            type="text"
            name="minMileage"
            placeholder="From"
            value={filters.minMileage}
            onChange={handleChange}
            className={styles.mileageField}
          />
          <input
            type="text"
            name="maxMileage"
            placeholder="To"
            value={filters.maxMileage}
            onChange={handleChange}
            className={styles.mileageField}
          />
        </div>
      </label>

      <button onClick={onSearch} className={styles.searchBtn}>
        Search
      </button>
    </form>
  );
};

export default CarFilter;
