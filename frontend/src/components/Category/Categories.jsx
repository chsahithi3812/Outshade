import React, { useState, useEffect } from "react";
import Category from "./Category";
import styles from "./Category.module.css";
import NewCategory from "./NewCategory";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(false);

  const sendRequest = async () => {
    try {
      const response = await fetch(`http://localhost:5000/category/categories`);
      const responseData = await response.json();
      setCategories(responseData.categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    sendRequest();
  }, []);
  const closeHandler = () => {
    setNewCategory(false);
  };
  return (
    <div className={styles.background}>
      <button
        className={`btn btn-success ${styles.newComplaint}`}
        onClick={() => {
          setNewCategory(true);
        }}
      >
        New Category
      </button>
      {newCategory && (
        <NewCategory onClose={closeHandler} style={styles.Card} />
      )}

      <div>
        <h1 className={styles.heading}>Categories</h1>
      </div>
      {categories.map((p) => (
        <Category
          sendRequest={sendRequest}
          key={p._id}
          name={p.name}
          type={p.type}
          id={p._id}
          products={p.products}
        />
      ))}
    </div>
  );
};

export default Categories;
