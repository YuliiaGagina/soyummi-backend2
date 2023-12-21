const { Recipe } = require("../../models/recipe");

const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "not Found");
  }
  res.json(result);
};

module.exports = updateFavorite;
