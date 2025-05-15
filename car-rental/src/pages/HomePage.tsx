import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import React from "react";
import Header from "../components/Header/Header";

function HomePage(): React.ReactElement {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.heading}>Find your perfect rental car</h1>
        <p className={styles.description}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link to="/catalog" className={styles.btn}>
          View Catalog
        </Link>
      </div>
    </>
  );
}

export default HomePage;
