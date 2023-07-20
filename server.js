/** @format */

const mongoose = require("mongoose");

const app = require("./app");

require("dotenv").config();
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log("Server is running"));
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
