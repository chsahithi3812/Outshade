const express = require("express");

const { check } = require("express-validator");

const router = express.Router();

const userCollectors = require("../collecters/userCollector");

router.post("/login", userCollectors.login);

router.post("/signup", userCollectors.signin);

router.patch("/updatedetails", userCollectors.updateProfile);

router.post("/resetpassword/:id/:token", userCollectors.resetpassword);

router.post("/forgotpassword", userCollectors.forgotPassword);

router.get("/:uid", userCollectors.getUserById);

module.exports = router;
