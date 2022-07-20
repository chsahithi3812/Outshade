import React, { useState, useEffect } from "react";
import styles from "./Category.module.css";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const navigate = useNavigate();
  const { name, type, products, id } = props;

  const deleteHandler = async () => {
    try {
      const response = await fetch(`http://localhost:5000/category/${id}`, {
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
  const showProducts = () => {
    navigate(`/${id}/products`);
  };
  return (
    <>
      <ul className={styles.ul}>
        <li className={styles.li}>Name: {name}</li>
        <li className={styles.li}>Type: {type}</li>
        <li className={styles.li}>
          <button className={styles.del} onClick={deleteHandler}>
            Delete
          </button>
          <button
            className={styles.del}
            style={{ backgroundColor: "green", border: "2px solid green" }}
            onClick={showProducts}
          >
            Products
          </button>
        </li>
      </ul>
    </>
  );
};

export default Product;
