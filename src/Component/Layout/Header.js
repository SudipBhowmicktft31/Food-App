import React, { Fragment } from "react";
import styles from "./Header.module.css";
import foodImg from "../../Assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h2>First Food</h2>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={styles['main-img']}>
        <img src={foodImg} alt="Food" />
      </div>
    </Fragment>
  );
};
export default Header;
