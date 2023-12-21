const Joi = require("joi");

const addSchema = Joi.object({
  photo: Joi.string().required(),
  title: Joi.string().required(),
  about: Joi.string().required(),
  category: Joi.string().required(),
  cooking_time: Joi.string().required(),
  ingredients: Joi.array().required(),
  recipe_preparation: Joi.string().required(),
});

module.exports = {
  addSchema,
};
