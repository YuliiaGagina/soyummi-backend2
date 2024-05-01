// const { Recipe } = require("../../models/recipe");

// const { RequestError } = require("../../helpers");

// const updateFavorite = async (req, res) => {
//   const { id } = req.params;
//   const result = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw RequestError(404, "not Found");
//   }
//   res.json(result);
// };

// module.exports = updateFavorite;
const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      throw RequestError(404, "Not Found");
    }

    // Переключаем значение свойства favorite
    recipe.favorite = !recipe.favorite;

    // Сохраняем изменения
    await recipe.save();

    res.json(recipe);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = updateFavorite;
