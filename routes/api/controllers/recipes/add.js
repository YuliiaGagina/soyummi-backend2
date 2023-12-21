const Recipe = require("../../models/recipe");

const add = async (req, res) => {
  const result = Recipe.create(req.body);
  res.status(201).json(result);
};

module.exports = add;
