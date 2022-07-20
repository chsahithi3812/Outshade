import React, { useState } from "react";
import styles from "./Category.module.css";
import Card from "../Card";

const NewProduct = (props) => {
  const sendRequest = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/category/createcategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            type: type,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [name, setName] = useState("");
  const [type, setType] = useState(0);

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const typeHandler = (event) => {
    setType(event.target.value);
  };
  const newCategoryHandler = (event) => {
    event.preventDefault();
    sendRequest();
    setType("");
    setName("");
  };

  return (
    <Card className={`${props.style}`}>
      <button onClick={props.onClose} className={styles.button}>
        <i className="fas fa-window-close">Close</i>
      </button>
      <div className="m-4">
        <h1 className={styles.heading}>New Category</h1>
      </div>
      <form
        action=""
        onSubmit={newCategoryHandler}
        className={`m-2 p-4 ${styles.newComplaintForm}`}
      >
        <label>Name : </label>
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
        <label htmlFor="type">Type : </label>
        <input
          className={styles.input}
          type="text"
          name="type"
          id="type"
          placeholder="Enter type..."
          value={type}
          onChange={typeHandler}
        />
        <br />
        <br />
        <button type="submit" className={styles.sbutton}>
          Submit Category
        </button>
      </form>
    </Card>
  );
};

export default NewProduct;
