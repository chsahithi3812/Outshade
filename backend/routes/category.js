const express = require("express");

const { check } = require("express-validator");

const router = express.Router();

const categoryCollector = require("../collecters/categoryCollector");

router.get("/categories", categoryCollector.getAllCategories);

router.post("/createcategory", categoryCollector.createCategory);

router.patch("/:cid", categoryCollector.editCategory);

router.delete("/:cid", categoryCollector.deleteCategory);

router.get("/:cid", categoryCollector.getProductsByCategory);

router.get("/name/:cid", categoryCollector.getCategoryById);

module.exports = router;
