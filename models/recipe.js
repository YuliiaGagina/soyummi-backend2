const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handlehandleSchemaValidationErrors } = require("../helpers");
const categoryList = [
  "Завтрак",
  "Салат",
  "Говядина",
  "Курица",
  "Паста",
  "Десерты",
  "Ягненок",
  "Свинина",
  "Другое",
  "Паста",
];

const recipeSchema = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    about: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: categoryList,
      default: "Другое",
      required: true,
    },
    cooking_time: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    recipe_preparation: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  title: Joi.string().required(),
  about: Joi.string().required(),
  category: Joi.string()
    .valueOf(...categoryList)
    .required(),
  cooking_time: Joi.string().required(),
  ingredients: Joi.string().required(),
  recipe_preparation: Joi.string().required(),
  favorite: Joi.bool(),
  photo: Joi.any(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

recipeSchema.post("save", handlehandleSchemaValidationErrors);

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  Recipe,
  schemas,
};
