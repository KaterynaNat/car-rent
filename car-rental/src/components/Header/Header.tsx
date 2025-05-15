import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

type HeaderProps = {
  showFavorites?: boolean;
};

const Header = ({ showFavorites = false }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Rental<span>Car</span>
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
          {showFavorites && (
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
