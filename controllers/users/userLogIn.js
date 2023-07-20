/** @format */

const bcrypt = require("bcrypt");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const { requestErrorHandler } = require("../../helpers");
const { User } = require("../../models/user");
const { sign } = require("jsonwebtoken");

const userLogIn = async(req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw requestErrorHandler(401, "Email or password invalid");
  }
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw requestErrorHandler(401, "Email or password invalid");
  }

  const payload = { id: user._id };
  const token = sign(payload, SECRET_KEY, { expiresIn: "2d" });

  const avatarURL = user.avatarURL || null;

  res.status(200).json(
    {
      user: {
        name: user.name,
        avatarURL,
      },
      token,
    })
    ;
};

module.exports = userLogIn;
