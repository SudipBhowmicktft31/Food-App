import React,{useContext} from "react";
import styles from "./MealItems.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/cart-context";

const MealItems = (props) => {
  const cartctx=useContext(CartContext);
  const price = `Rs.${props.price}`;
  const addToCartHandler=amount=>{
    cartctx.addItems({
      id:props.id,
      name:props.name,
      amount:amount,
      price:props.price
    })
  }
  return (
    <div className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
      </div>
    </div>
  );
};
export default MealItems;
