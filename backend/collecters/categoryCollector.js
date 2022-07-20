const { validationResult } = require("express-validator");
const Category = require("../models/Category");
const Product = require("../models/Products");

const getCategoryById = async (req, res, next) => {
  const cid = req.params.cid;
  let category;
  try {
    category = await Category.findById(cid).exec();
  } catch (err) {
    return next(Error(err, 500));
  }
  res.json({ category });
};

const getAllCategories = async (req, res, next) => {
  try {
    let categories = await Category.find().exec();
    res.json({ categories });
  } catch (err) {
    return next(Error(err, 500));
  }
};

const createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(Error("InValid Input", 422));
  }
  const { name, type } = req.body;
  const newCategory = new Category({
    name,
    type,
    products: [],
  });
  try {
    const category = await newCategory.save();
    res.json({ category });
  } catch (err) {
    return next(Error(err, 500));
  }
};

const editCategory = async (req, res, next) => {
  const cid = req.params.cid;

  let category;
  try {
    category = await Category.findById(cid).exec();
  } catch (err) {
    next(Error(err, 500));
  }

  if (!category) {
    return next(new Error(`Couldn't find category`, 404));
  }

  const { name, type } = req.body;
  try {
    category.name = name;
    category.type = type;
    await category.save();
  } catch (err) {
    return next(Error(err, 500));
  }
  res.json({ category });
};

const deleteCategory = async (req, res, next) => {
  const cid = req.params.cid;

  let category;
  let products;
  try {
    category = await Category.findById(cid).exec();
    products = category.products;
  } catch (err) {
    next(Error(err, 500));
  }

  if (!category) {
    return next(new Error(`Couldn't find category`, 404));
  }

  try {
    category.remove();
  } catch (err) {
    next(Error(err, 500));
  }
  try {
    products.map(async (p) => {
      deleteProduct = await Product.findById(p).exec();
      deleteProduct.remove();
    });
  } catch (err) {
    return next(Error(err, 500));
  }
  res.json("category deleted");
};

const getProductsByCategory = async (req, res, next) => {
  const cid = req.params.cid;
  try {
    const products = await Product.find({ categoryId: cid }).exec();
    res.json({ products });
  } catch (err) {
    return next(Error(err, 500));
  }
};

exports.getAllCategories = getAllCategories;
exports.createCategory = createCategory;
exports.editCategory = editCategory;
exports.deleteCategory = deleteCategory;
exports.getProductsByCategory = getProductsByCategory;
exports.getCategoryById = getCategoryById;
