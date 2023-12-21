const { Recipe } = require("../../models/recipe");
const fs = require("fs/promises");
const path = require("path");

const products = [];

const productsDir = path.join(__dirname, "../../", "public", "products");

const add = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  try {
    const resultUpload = path.join(productsDir, originalname);

    await fs.rename(tempUpload, resultUpload);
    const photo = path.join("products", originalname);

    const newProduct = {
      photo: photo,
      title: req.body.title,
      about: req.body.about,
      category: req.body.category,
      cooking_time: req.body.cooking_time,
      ingredients: req.body.ingredients,
      recipe_preparation: req.body.recipe_preparation,
      favorite: req.body.favorite,
      owner: req.user._id,
    };
    products.push(newProduct);

    const result = await Recipe.create({ ...newProduct });

    res.status(201).json(result);
  } catch {
    await fs.unlink(tempUpload);
  }
};

module.exports = add;
