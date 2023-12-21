const { Recipe } = require("../../models/recipe");

const getAll = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Recipe.find({}, "-createdAt -updatedAt", {
    skip,
    limit: +limit,
  });
  res.json(result);
};

module.exports = getAll;
