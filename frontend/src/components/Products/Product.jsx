import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";

const Product = (props) => {
  const { name, price, category, user, id } = props;
  const [categoryName, setCategoryName] = useState("");
  const [userName, setUserName] = useState("");
  const sendRequest = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/${user}`);
      const responseData = await response.json();
      setUserName(responseData.user.name);
      const cresponse = await fetch(
        `http://localhost:5000/category/name/${category}`
      );
      const cresponseData = await cresponse.json();
      setCategoryName(cresponseData.category.name);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      props.sendRequest();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <>
      <ul className={styles.ul}>
        <li className={styles.li}>Name: {name}</li>
        <li className={styles.li}>Price: {price}</li>
        <li className={styles.li}>Category: {categoryName}</li>
        <li className={styles.li}>User: {userName}</li>
        <li className={styles.li}>
          <button className={styles.del} onClick={deleteHandler}>
            Delete
          </button>
        </li>
      </ul>
    </>
  );
};

export default Product;
