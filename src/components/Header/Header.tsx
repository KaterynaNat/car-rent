import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/cars/selectors";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/Logo.svg";

const Header = () => {
  const favorites = useSelector(selectFavorites);
  const hasFavorites = favorites.length > 0;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="RentalCar logo" className={styles.logoImage} />
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Catalog
          </NavLink>
          {hasFavorites && (
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Favorites
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
