const express = require("express");

const { check } = require("express-validator");

const router = express.Router();

const productCollector = require("../collecters/productCollector");

router.get("/", productCollector.getAllProducts);

router.get("/:pid", productCollector.getProduct);

router.post(
  "/createproduct",
  [
    check("name").not().isEmpty(),
    check("price").not().isEmpty(),
    check("userId").not().isEmpty(),
    check("categoryId").not().isEmpty(),
  ],
  productCollector.createProduct
);

router.patch("/:pid", productCollector.editProduct);

router.delete("/:pid", productCollector.deleteProduct);

module.exports = router;
