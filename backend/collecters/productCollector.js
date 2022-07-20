const { validationResult } = require("express-validator");
const Product = require("../models/Products");
const Category = require("../models/Category");
const User = require("../models/User");

const getAllProducts = async (req, res, next) => {
  try {
    let products = await Product.find().exec();
    res.json({ products });
  } catch (err) {
    return next(Error(err, 500));
  }
};

const getProduct = async (req, res, next) => {
  const pid = req.params.pid;
  let product;
  try {
    product = await Product.findById(pid).exec();
  } catch (err) {
    return next(Error(err, 500));
  }

  if (!product) {
    return next(new Error(`Couldn't find Product`, 404));
  }
  res.json({ product });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(Error("InValid Input", 422));
  }
  const { name, price, userId, categoryId } = req.body;
  const newProduct = new Product({
    name,
    price,
    userId,
    categoryId,
  });
  let product;
  try {
    product = await newProduct.save();
  } catch (err) {
    return next(Error(err, 500));
  }
  pid = product.id;
  res.json({ product });
  try {
    const category = await Category.findById(categoryId).exec();
    var categoryProducts = category.products;
    categoryProducts.push(pid);
    category.products = categoryProducts;
    category.save();
    const user = await User.findById(userId).exec();
    var userProducts = user.products;
    userProducts.push(pid);
    user.products = userProducts;
    user.save();
  } catch (err) {
    return next(Error(err, 500));
  }
};

const editProduct = async (req, res, next) => {
  const pid = req.params.pid;

  let product;
  try {
    product = await Product.findById(pid).exec();
  } catch (err) {
    next(Error(err, 500));
  }

  if (!product) {
    return next(new Error(`Couldn't find product`, 404));
  }

  const { name, price, userId, categoryId } = req.body;
  try {
    product.name = name;
    product.price = price;
    product.userId = userId;
    product.categoryId = categoryId;
    await product.save();
  } catch (err) {
    return next(Error(err, 500));
  }
  res.json({ product });
};

const deleteProduct = async (req, res, next) => {
  const pid = req.params.pid;

  let product;
  let cid;
  try {
    product = await Product.findById(pid).exec();
    cid = product.categoryId;
    uid = product.userId;
  } catch (err) {
    next(Error(err, 500));
  }

  if (!product) {
    return next(new Error(`Couldn't find product`, 404));
  }

  try {
    product.remove();
  } catch (err) {
    next(Error(err, 500));
  }

  let category;
  let user;
  try {
    category = await Category.findById(cid).exec();
    categoryProducts = category.products;
    const index = categoryProducts.indexOf(pid);
    categoryProducts.splice(index);
    category.products = categoryProducts;
    category.save();
  } catch (err) {
    return next(Error(err, 500));
  }
  try {
    user = await User.findById(uid).exec();
    userProducts = user.products;
    const index = userProducts.indexOf(pid);
    userProducts.splice(index);
    user.products = userProducts;
    user.save();
  } catch (err) {
    return next(Error(err, 500));
  }
  res.json("Product deleted");
};

exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
exports.createProduct = createProduct;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
