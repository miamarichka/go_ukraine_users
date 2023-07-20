/** @format */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const { requestErrorHandler } = require("../../helpers");
const { User } = require("../../models/user");

const userSignUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw requestErrorHandler(409, `User with ${email} email already exist`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashedPassword });

    const payload = { id: newUser._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2d" });

  res.status(201).json({
    token,
  });
};

module.exports = userSignUp;
