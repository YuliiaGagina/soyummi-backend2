const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404, "not Found");
  }
  res.json({
    message: "Recipe deleted successfully",
  });
};
module.exports = removeById;
