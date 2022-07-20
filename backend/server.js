const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/config");
const app = express();
require("dotenv").config();


connectDB()
app.use("*", cors());

app.use(express.json());

app.use("/product", require("./routes/product"));

app.use("/category", require("./routes/category"));

app.use("/user", require("./routes/user"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use((req, res, next) => {
  const error = new Error("Couldn't find this route", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured " });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`running at ${port}`);
});
