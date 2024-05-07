const { User } = require("../../models");
const { Conflict } = require("http-errors");

const getUsers = async (req, res) => {
  const users = await User.find();

  if (!users) {
    throw new Conflict("no users");
  }

  res.status(201).json(users);
};

module.exports = getUsers;
