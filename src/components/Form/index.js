import React, { useState } from 'react';
import apiWrapper from '../../server';

import styles from './styles.module.css';

/** @typedef {{ offerPremium: boolean, setOrders: React.Dispatch<React.SetStateAction<any[]>> }} IProps */

/**
 * Form used to create a pizza order
 * @param {IProps} props an object containing props of type IProps
 */
function PizzaForm({ offerPremium, setOrders }) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    comments: "",
    premium: false,
    type: ""
  });

  /**
   * event handler for some change to the form (entry of new data, changes, etc.)
   * @param {React.FormEvent<HTMLInputElement>} event 
   */
  function handleFormChange(event) {
    const { name, type, value, checked } = event.target;

    // setState function can take in two different parameters
    // either the value to set it to
    // *OR* a callback containing the previous state which would then return the value to set the state to based on the previous
    // here we are using the old state, and the spread operator to create a new object from it
    // before overwriting the field we want
    // [name] is how you set a field (key of object) dynamically
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  /**
   * triggered when form is submitted
   * @param {React.MouseEvent<React.HTMLInputElement>} event 
   */
  async function handleSubmit(event) {
    event.preventDefault();
    
    const response = await apiWrapper.post("/create");
    setOrders(oldOrders => [...oldOrders, response.data]);
  }

  return (
    <form>
      <input
        type="text"
        name="firstName"
        onChange={handleFormChange}
        placeholder="First Name"
        value={formData.firstName}
        className={styles["text-input"]}
      />
      <input
        type="email"
        name="email"
        onChange={handleFormChange}
        placeholder="Email"
        value={formData.email}
        className={styles["email-input"]}
      />
      <textarea
        value={formData.comments}
        name="comments"
        placeholder="Comments"
        onChange={handleFormChange}
        className={styles["comments"]}
      />
      {offerPremium && <input
        type="checkbox"
        name="premium"
        checked={formData.premium}
        onChange={handleFormChange}
        className={styles["checkbox-input"]}
      />}
      {offerPremium ? <label htmlFor="premium">Premium size?</label> : <p>Premium is not offered at the moment</p>}
      <br /><br />

      <fieldset className={styles["selection-box"]}>
        <legend>Type of Pizza</legend>
        <input 
          type="radio"
          name="type"
          value="cheese"
          checked={formData.type === "cheese"}
          onChange={handleFormChange}
          className={styles["radio-input"]}
        />
        <label htmlFor="type">Cheese</label>
        <br />
        
        <input 
          type="radio"
          name="type"
          value="pepperoni"
          checked={formData.type === "pepperoni"}
          onChange={handleFormChange}
          className={styles["radio-input"]}
        />
        <label htmlFor="pepperoni">Pepperoni</label>
        <br />
        
        <input 
          type="radio"
          name="type"
          value="veggie"
          checked={formData.type === "veggie"}
          onChange={handleFormChange}
          className={styles["radio-input"]}
        />
        <label htmlFor="veggie">Veggie</label>
        <br />
    </fieldset>
    <br />
    <button className={styles["submit-button"]} onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default PizzaForm;
