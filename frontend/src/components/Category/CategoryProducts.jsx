import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Product from "../Products/Product";
import styles from "../Products/Product.module.css";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const { cid } = useParams();
  const sendRequest = async () => {
    try {
      const response = await fetch(`http://localhost:5000/category/${cid}`);
      const responseData = await response.json();
      setProducts(responseData.products);
      const nresponse = await fetch(`http://localhost:5000/category/name/${cid}`);
      const nresponseData = await nresponse.json();
      setName(nresponseData.category.name)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div className={styles.background}>
      <div>
        <h1 className={styles.heading}>{name} Products</h1>
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

export default CategoryProducts;
