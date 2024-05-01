const { Recipe } = require("../../models/recipe");

const getAllForRecentUser = async (req, res) => {
  const { _id } = req.user;

  const result = await Recipe.find(
    { owner: _id },

    "-createdAt -updatedAt"
  ).populate("owner", "_id name ");
  res.json(result);
};

module.exports = getAllForRecentUser;
