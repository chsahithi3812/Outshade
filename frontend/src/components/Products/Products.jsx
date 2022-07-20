import React, { useState, useEffect } from "react";
import Product from "./Product";
import NewProduct from "./NewProduct";
import styles from "./Product.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(false);
  const sendRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/product");
      const responseData = await response.json();
      setProducts(responseData.products);
    } catch (err) {
      console.log(err);
    }
  };
  const closeHandler = () => {
    setNewProduct(false);
  };
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <div className={styles.background}>
      <button
        className={`btn btn-success ${styles.newComplaint}`}
        onClick={() => {
          setNewProduct(true);
        }}
      >
        New Product
      </button>
      {newProduct && <NewProduct onClose={closeHandler} style={styles.Card} />}
      <div>
        <h1 className={styles.heading}>Products</h1>
      </div>
      {products.map((p) => (
        <Product
          sendRequest={sendRequest}
          key={p._id}
          name={p.name}
          price={p.price}
          user={p.userId}
          category={p.categoryId}
          id={p._id}
        />
      ))}
    </div>
  );
};

export default Products;
