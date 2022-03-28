import React, { useState, useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [didSubmitt, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `Rs.${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };
  const cartItem = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)} //this ensures that the id of  the to be added or removed item is passed here to remove handler
          onAdd={cartItemAddHandler.bind(null, item)}
          //bind preconfigures the function for future execution and basically allows us to pre configure the argument that function will received when it beign executed
        />
      ))}
    </ul>
  );
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      "https://react-http-request-3d0f7-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Order Successful !!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCart}>
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !didSubmitt && (
        <React.Fragment>
          {cartItem}
          <div className={styles.total}>
            <span>Total Price</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (
            <Checkout
              onCancel={props.onHideCart}
              onConfirm={submitOrderHandler}
            />
          )}
          {!isCheckout && (
            <div className={styles.actions}>
              <button
                className={styles["button--alt"]}
                onClick={props.onHideCart}
              >
                Cancel
              </button>
              {hasItem && (
                <button className={styles.button} onClick={orderHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </React.Fragment>
      )}
      {isSubmitting && <p>Sending Ordered Data</p>}
      {didSubmitt && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
