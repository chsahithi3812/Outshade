import React, { useState } from "react";
import styles from "./Product.module.css";
import Card from "../Card";

const NewProduct = (props) => {
  const sendRequest = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/product/createproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            price: price,
            categoryId: category,
            userId: user,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const priceHandler = (event) => {
    setPrice(event.target.value);
  };
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const userHandler = (event) => {
    setUser(event.target.value);
  };
  const newProductHandler = (event) => {
    event.preventDefault();
    sendRequest();
    setUser("");
    setCategory("");
    setName("");
    setPrice(0);
  };

  return (
    <Card className={`${props.style}`}>
      <button onClick={props.onClose} className={styles.button}>
        <i className="fas fa-window-close">Close</i>
      </button>
      <div className="m-4">
        <h1 className={styles.heading}>New Product</h1>
      </div>
      <form
        action=""
        onSubmit={newProductHandler}
        className={`m-2 p-4 ${styles.newComplaintForm}`}
      >
        <label htmlFor="Name">Name : </label>
        <input
          className={styles.input}
          type="text"
          name="Name"
          id="Name"
          placeholder="Enter your name"
          value={name}
          onChange={nameHandler}
        />
        <br />
        <br />
        <label htmlFor="Price">Price : </label>
        <input
         className={styles.input}
          type="number"
          name="Price"
          id="Price"
          placeholder="Enter your price"
          value={price}
          onChange={priceHandler}
        />
        <br />
        <br />
        <label htmlFor="category">Category Id : </label>
        <input
         className={styles.input}
          type="text"
          name="category"
          id="category"
          placeholder="Enter your category"
          value={category}
          onChange={categoryHandler}
        />
        <br />
        <br />
        <label htmlFor="user">User Id : </label>
        <input
         className={styles.input}
          type="text"
          name="user"
          id="user"
          placeholder="Enter your user"
          value={user}
          onChange={userHandler}
        />
        <br />
        <br />
        <button type="submit" className={styles.sbutton}>
          Submit Product
        </button>
      </form>
    </Card>
  );
};

export default NewProduct;
