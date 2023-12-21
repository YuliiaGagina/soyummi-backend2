const add = require("./add");
const getAll = require("./getAll");
const getById = require("./getById");
const removeById = require("./removeById");
const updateById = require("./updateById");
const updateFavorite = require("./updateFavorite");
const getAllForRecentUser = require("./getAllForRecentUser");

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  removeById,
  updateFavorite,
  getAllForRecentUser,
};
