const { User } = require("../../models");
const userServise = require("../../service/user-servise");

// const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
// const uuid = require("uuid");
// const mailServise = require("../../service/mail-service");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userData = await userServise.registration(email, password, name);
  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httponly: true,
  });

  return res.status(201).json(userData);
};

module.exports = register;
