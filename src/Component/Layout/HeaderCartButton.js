import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../Store/cart-context";
import CartIcon from "../Cart/CartIcon";
const HeaderCartButton = (props) => {
  const [buttonHighlight, setButtonHighlight] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItem = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);
  const btnClasses = `${styles.button} ${buttonHighlight ? styles.bump : ""} `;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonHighlight(true);
    const timer = setTimeout(() => {
      setButtonHighlight(false);
    }, 300);
    return ()=>{
      clearTimeout(timer);
    }
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItem}</span>
    </button>
  );
};
export default HeaderCartButton;
