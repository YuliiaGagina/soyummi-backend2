const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userServise = require("../../service/user-servise");



const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await userServise.login(email, password);

  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httponly: true,
  });

  return res.status(201).json(userData);
};

module.exports = login;
