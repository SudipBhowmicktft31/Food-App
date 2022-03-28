import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;
const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    pin: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pinInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPin = pinInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPinIsValid = isFiveChar(enteredPin);
    const enteredCityIsValid = !isEmpty(enteredCity);
    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      pin: enteredPinIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPinIsValid &&
      enteredCityIsValid;
    if (!formIsValid) {
      return;
    }
    //submit the cart data
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        pin: enteredPin,
        city: enteredCity,
    });
  };
  const nameControlClass=`${styles.control} ${formInputValidity.name?'':styles.invalid}`
  const streetControlClass=`${styles.control} ${formInputValidity.street?'':styles.invalid}`
  const pinControlClass=`${styles.control} ${formInputValidity.pin?'':styles.invalid}`
  const cityControlClass=`${styles.control} ${formInputValidity.city?'':styles.invalid}`
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClass}>
        <label htmlFor="name">Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputValidity.name&&<p>Fill it</p>}
      </div>
      <div className={streetControlClass}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputValidity.street&&<p>Fill it</p>}
      </div>
      <div className={pinControlClass}>
        <label htmlFor="pin">Pin Code</label>
        <input ref={pinInputRef} type="text" id="pin" />
        {!formInputValidity.pin&&<p>Fill it</p>}
      </div>
      <div className={cityControlClass}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputValidity.city&&<p>Fill it</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
